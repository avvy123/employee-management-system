import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import Landing from './pages/Landing';
import ForgotPasswordPage from './pages/ForgotPassword';

/* =======================
   Lazy Loaded Components
======================= */
const Navbar = lazy(() => import('./common/Navbar'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EmployeeList = lazy(() => import('./pages/EmployeeList'));
const EmployeeDetail = lazy(() => import('./pages/EmployeeDetail'));
const AddEmployee = lazy(() => import('./pages/AddEmployee'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

/* =======================
   Private Route Guard
======================= */
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loader">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
}

/* =======================
   App Component
======================= */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Suspense fallback={<div className="loader">Loading page...</div>}>
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/employees"
                element={
                  <PrivateRoute>
                    <EmployeeList />
                  </PrivateRoute>
                }
              />

              <Route
                path="/employees/add"
                element={
                  <PrivateRoute>
                    <AddEmployee />
                  </PrivateRoute>
                }
              />

              <Route
                path="/employees/:id"
                element={
                  <PrivateRoute>
                    <EmployeeDetail />
                  </PrivateRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;