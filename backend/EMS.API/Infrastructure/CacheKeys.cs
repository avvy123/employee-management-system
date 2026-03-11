namespace EMS.API.Infrastructure
{
    public static class CacheKeys
    {
        public const string EmployeesAll = "employees:all";
        public static string EmployeeById(int id) => $"employees:{id}";
        public const string DashboardStats = "dashboard:stats";
    }
}