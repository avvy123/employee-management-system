import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {UserIcon, PasswordIcon, SigninIcon, EMSLoginLogo, CrossIcon} from "../common/Icon";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password.');
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        navigate("/forgot-password")
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <EMSLoginLogo />
                    </div>
                    <h1>EMS Login</h1>
                    <p>Sign in to manage employees</p>
                </div>

                {error && (
                    <div className="alert alert-error login-alert">
                        <CrossIcon />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-with-icon">
                           <UserIcon />
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <PasswordIcon />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleNavigate}
                                className="text-sm text-blue-600 hover:underline cursor-pointer"
                            >
                            Forgot Password?
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? (
                            <span className="spinner-small"></span>
                        ) : (
                            <>
                                Sign In
                                <SigninIcon />
                            </>
                        )}
                    </button>
                </form>
                <div className="signup-link">
                    <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
