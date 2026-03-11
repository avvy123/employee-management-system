using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using EMS.API.Data;
using EMS.API.DTOs;
using EMS.API.Mappings;
using EMS.API.Infrastructure;

namespace EMS.API.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;
        private readonly IDistributedCache _cache;

        public EmployeeService(AppDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        // =========================
        // GET ALL EMPLOYEES (CACHED)
        // =========================
        public async Task<List<EmployeeDto>> GetAllAsync()
        {
            var cached = await _cache.GetStringAsync(CacheKeys.EmployeesAll);
            if (cached != null)
            {
                return JsonSerializer.Deserialize<List<EmployeeDto>>(cached)!;
            }

            var employees = await _context.Employees
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();

            var result = employees.ToDtoList();

            await _cache.SetStringAsync(
                CacheKeys.EmployeesAll,
                JsonSerializer.Serialize(result),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                }
            );

            return result;
        }

        // =========================
        // GET EMPLOYEE BY ID (CACHED)
        // =========================
        public async Task<EmployeeDto?> GetByIdAsync(int id)
        {
            var cacheKey = CacheKeys.EmployeeById(id);
            var cached = await _cache.GetStringAsync(cacheKey);

            if (cached != null)
            {
                return JsonSerializer.Deserialize<EmployeeDto>(cached);
            }

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return null;

            var dto = employee.ToDto();

            await _cache.SetStringAsync(
                cacheKey,
                JsonSerializer.Serialize(dto),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                }
            );

            return dto;
        }

        // =========================
        // CREATE (INVALIDATE CACHE)
        // =========================
        public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
        {
            var employee = dto.ToEntity();
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            await InvalidateEmployeeCache(employee.Id);

            return employee.ToDto();
        }

        // =========================
        // UPDATE (INVALIDATE CACHE)
        // =========================
        public async Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return null;

            employee.UpdateFromDto(dto);
            await _context.SaveChangesAsync();

            await InvalidateEmployeeCache(id);

            return employee.ToDto();
        }

        // =========================
        // DELETE (INVALIDATE CACHE)
        // =========================
        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            await InvalidateEmployeeCache(id);

            return true;
        }

        // =========================
        // SEARCH (NO CACHE)
        // =========================
        public async Task<List<EmployeeDto>> SearchAsync(string query)
        {
            var lowerQuery = query.ToLower();

            var employees = await _context.Employees
                .Where(e =>
                    e.FirstName.ToLower().Contains(lowerQuery) ||
                    e.LastName.ToLower().Contains(lowerQuery) ||
                    e.Email.ToLower().Contains(lowerQuery) ||
                    e.Department.ToLower().Contains(lowerQuery) ||
                    e.Position.ToLower().Contains(lowerQuery))
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();

            return employees.ToDtoList();
        }

        // =========================
        // DASHBOARD STATS (CACHED)
        // =========================
        public async Task<DashboardStatsDto> GetDashboardStatsAsync()
        {
            var cached = await _cache.GetStringAsync(CacheKeys.DashboardStats);
            if (cached != null)
            {
                return JsonSerializer.Deserialize<DashboardStatsDto>(cached)!;
            }

            var employees = await _context.Employees.ToListAsync();

            var stats = new DashboardStatsDto
            {
                TotalEmployees = employees.Count,
                ActiveEmployees = employees.Count(e => e.IsActive),
                InactiveEmployees = employees.Count(e => !e.IsActive),
                TotalDepartments = employees.Select(e => e.Department).Distinct().Count(),
                AverageSalary = employees.Any()
                    ? Math.Round(employees.Average(e => e.Salary), 2)
                    : 0,
                DepartmentStats = employees
                    .GroupBy(e => e.Department)
                    .Select(g => new DepartmentStatDto
                    {
                        Department = g.Key,
                        Count = g.Count()
                    })
                    .OrderByDescending(d => d.Count)
                    .ToList(),
                RecentEmployees = employees
                    .OrderByDescending(e => e.DateOfJoining)
                    .Take(5)
                    .Select(e => e.ToDto())
                    .ToList()
            };

            await _cache.SetStringAsync(
                CacheKeys.DashboardStats,
                JsonSerializer.Serialize(stats),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(3)
                }
            );

            return stats;
        }

        // =========================
        // CACHE INVALIDATION HELPER
        // =========================
        private async Task InvalidateEmployeeCache(int employeeId)
        {
            await _cache.RemoveAsync(CacheKeys.EmployeesAll);
            await _cache.RemoveAsync(CacheKeys.EmployeeById(employeeId));
            await _cache.RemoveAsync(CacheKeys.DashboardStats);
        }
    }
}