import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import employeeService from '../services/employeeService';

function Dashboard() {

  const {
    data: stats,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () =>
      employeeService.getDashboardStats().then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="error-container">
        <h2>Failed to load dashboard</h2>
        <p>Please ensure the backend server is running.</p>
        <button className="btn btn-primary" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  const formatSalary = (salary) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(salary));

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of your organization</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Employees"
          value={stats.totalEmployees}
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        <StatsCard
          title="Active"
          value={stats.activeEmployees}
          gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        />
        <StatsCard
          title="Inactive"
          value={stats.inactiveEmployees}
          gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        />
        <StatsCard
          title="Departments"
          value={stats.totalDepartments}
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        />
        <StatsCard
          title="Avg. Salary"
          value={formatSalary(stats.averageSalary)}
          gradient="linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
        />
      </div>

      {/* Department Breakdown */}
      <div className="dashboard-section">
        <h2>Department Breakdown</h2>
        <div className="department-grid">
          {stats.departmentStats.map((dept) => (
            <div key={dept.department} className="department-card">
              <div className="dept-count">{dept.count}</div>
              <div className="dept-name">{dept.department}</div>
              <div className="dept-bar">
                <div
                  className="dept-bar-fill"
                  style={{
                    width: `${(dept.count / stats.totalEmployees) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Employees */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Joinings</h2>
          <Link to="/employees" className="view-all-link">
            View All →
          </Link>
        </div>
        <div className="recent-table-container">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <Link
                      to={`/employees/${emp.id}`}
                      className="employee-link"
                    >
                      {emp.firstName} {emp.lastName}
                    </Link>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>
                    {new Date(emp.dateOfJoining).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${emp.isActive ? 'active' : 'inactive'
                        }`}
                    >
                      {emp.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;