using Microsoft.EntityFrameworkCore;
using EMS.API.Models;

namespace EMS.API.Data
{
    public static class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // BCrypt hash for "admin123"
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    PasswordHash = "$2a$11$G7yT92Z1o0l7K4BQQ1x/bO2.pL9jP2N/hGq0U1tH6P00.hZlY3p1e", // admin123
                    CreatedAt = new DateTime(2024, 1, 1)
                }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    FirstName = "Rahul",
                    LastName = "Sharma",
                    Email = "rahul.sharma@company.com",
                    Phone = "9876543210",
                    Department = "Engineering",
                    Position = "Senior Developer",
                    Salary = 95000m,
                    DateOfJoining = new DateTime(2021, 3, 15),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 2,
                    FirstName = "Priya",
                    LastName = "Patel",
                    Email = "priya.patel@company.com",
                    Phone = "9876543211",
                    Department = "HR",
                    Position = "HR Manager",
                    Salary = 85000m,
                    DateOfJoining = new DateTime(2020, 7, 1),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 3,
                    FirstName = "Amit",
                    LastName = "Kumar",
                    Email = "amit.kumar@company.com",
                    Phone = "9876543212",
                    Department = "Engineering",
                    Position = "Tech Lead",
                    Salary = 120000m,
                    DateOfJoining = new DateTime(2019, 1, 10),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 4,
                    FirstName = "Sneha",
                    LastName = "Gupta",
                    Email = "sneha.gupta@company.com",
                    Phone = "9876543213",
                    Department = "Design",
                    Position = "UI/UX Designer",
                    Salary = 78000m,
                    DateOfJoining = new DateTime(2022, 5, 20),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 5,
                    FirstName = "Vikram",
                    LastName = "Singh",
                    Email = "vikram.singh@company.com",
                    Phone = "9876543214",
                    Department = "Marketing",
                    Position = "Marketing Manager",
                    Salary = 82000m,
                    DateOfJoining = new DateTime(2021, 9, 1),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 6,
                    FirstName = "Ananya",
                    LastName = "Reddy",
                    Email = "ananya.reddy@company.com",
                    Phone = "9876543215",
                    Department = "Finance",
                    Position = "Financial Analyst",
                    Salary = 75000m,
                    DateOfJoining = new DateTime(2022, 11, 15),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 7,
                    FirstName = "Rohan",
                    LastName = "Mehta",
                    Email = "rohan.mehta@company.com",
                    Phone = "9876543216",
                    Department = "Engineering",
                    Position = "Junior Developer",
                    Salary = 55000m,
                    DateOfJoining = new DateTime(2023, 2, 1),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 8,
                    FirstName = "Kavita",
                    LastName = "Joshi",
                    Email = "kavita.joshi@company.com",
                    Phone = "9876543217",
                    Department = "HR",
                    Position = "Recruiter",
                    Salary = 60000m,
                    DateOfJoining = new DateTime(2022, 8, 10),
                    IsActive = false,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 9,
                    FirstName = "Arjun",
                    LastName = "Nair",
                    Email = "arjun.nair@company.com",
                    Phone = "9876543218",
                    Department = "Engineering",
                    Position = "DevOps Engineer",
                    Salary = 92000m,
                    DateOfJoining = new DateTime(2020, 12, 5),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 10,
                    FirstName = "Deepika",
                    LastName = "Verma",
                    Email = "deepika.verma@company.com",
                    Phone = "9876543219",
                    Department = "Design",
                    Position = "Graphic Designer",
                    Salary = 65000m,
                    DateOfJoining = new DateTime(2023, 6, 15),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 11,
                    FirstName = "Sanjay",
                    LastName = "Mishra",
                    Email = "sanjay.mishra@company.com",
                    Phone = "9876543220",
                    Department = "Finance",
                    Position = "Accountant",
                    Salary = 58000m,
                    DateOfJoining = new DateTime(2021, 4, 20),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                },
                new Employee
                {
                    Id = 12,
                    FirstName = "Neha",
                    LastName = "Agarwal",
                    Email = "neha.agarwal@company.com",
                    Phone = "9876543221",
                    Department = "Marketing",
                    Position = "Content Strategist",
                    Salary = 68000m,
                    DateOfJoining = new DateTime(2022, 1, 10),
                    IsActive = true,
                    CreatedAt = new DateTime(2024, 1, 1)
                }
            );
        }
    }
}
