using EMS.API.DTOs;
using EMS.API.Models;

namespace EMS.API.Mappings
{
    public static class EmployeeMappings
    {
        public static EmployeeDto ToDto(this Employee employee)
        {
            return new EmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                Phone = employee.Phone,
                Department = employee.Department,
                Position = employee.Position,
                Salary = employee.Salary,
                DateOfJoining = employee.DateOfJoining,
                IsActive = employee.IsActive,
                CreatedAt = employee.CreatedAt,
                UpdatedAt = employee.UpdatedAt
            };
        }

        public static Employee ToEntity(this CreateEmployeeDto dto)
        {
            return new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                Department = dto.Department,
                Position = dto.Position,
                Salary = dto.Salary,
                DateOfJoining = dto.DateOfJoining,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
        }

        public static void UpdateFromDto(this Employee employee, UpdateEmployeeDto dto)
        {
            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.Email = dto.Email;
            employee.Phone = dto.Phone;
            employee.Department = dto.Department;
            employee.Position = dto.Position;
            employee.Salary = dto.Salary;
            employee.DateOfJoining = dto.DateOfJoining;
            employee.IsActive = dto.IsActive;
            employee.UpdatedAt = DateTime.UtcNow;
        }

        public static List<EmployeeDto> ToDtoList(this IEnumerable<Employee> employees)
        {
            return employees.Select(e => e.ToDto()).ToList();
        }
    }
}
