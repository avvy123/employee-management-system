using EMS.API.DTOs;

namespace EMS.API.Services
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDto>> GetAllAsync();
        Task<EmployeeDto?> GetByIdAsync(int id);
        Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto);
        Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto);
        Task<bool> DeleteAsync(int id);
        Task<List<EmployeeDto>> SearchAsync(string query);
        Task<DashboardStatsDto> GetDashboardStatsAsync();
    }

    public class DashboardStatsDto
    {
        public int TotalEmployees { get; set; }
        public int ActiveEmployees { get; set; }
        public int InactiveEmployees { get; set; }
        public int TotalDepartments { get; set; }
        public decimal AverageSalary { get; set; }
        public List<DepartmentStatDto> DepartmentStats { get; set; } = new();
        public List<EmployeeDto> RecentEmployees { get; set; } = new();
    }

    public class DepartmentStatDto
    {
        public string Department { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
