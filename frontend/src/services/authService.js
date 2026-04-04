import axios from 'axios';

const API_BASE_URL = 'http://localhost:5100/api';

const authService = {
    register: async (username, password) => {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            password
        });
        return response.data;
    },
    login: async (username, password) => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        return response.data;
    },
    resetPassword: async (data) => {
        const response = await axios.post(
            `${API_BASE_URL}/auth/reset-password`,
            data
        );
        return  response.data;
    }
};

export default authService;
