// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // { token, username, role }
    const [loading, setLoading] = useState(true);

    // On app load, check localStorage for token/username/role
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');

        if (token && username && role) {
            setUser({ token, username, role });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    // Login function
    const login = async (username, password) => {
        try {
            const data = await authService.login(username, password);
            const { token, username: resUsername } = data;

            // Decode JWT to get role
            const decoded = jwtDecode(token);
            const role = decoded.role;

            // Save to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', resUsername);
            localStorage.setItem('role', role);

            setUser({ token, username: resUsername, role });

            // Set default axios header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Hook for easier access
export const useAuth = () => useContext(AuthContext);