import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import EmployeeForm from '../components/Employee/EmployeeForm';
import employeeService from '../services/employeeService';

function AddEmployee() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const queryClient = useQueryClient();

    const handleSubmit = async (data) => {
        try {
            setError('');
            await employeeService.create(data);
            queryClient.invalidateQueries(['employees']);
            navigate('/employees');
        } catch (err) {
            if (err.response?.status === 400) {
                setError('Please check your input and try again.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to add employee. Please try again.');
            }
            console.error('Create failed:', err);
        }
    };

    return (
        <div className="form-page">
            <div className="page-header">
                <h1>Add New Employee</h1>
                <p className="page-subtitle">Fill in the details to add a new employee</p>
            </div>

            {error && (
                <div className="alert alert-error">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {error}
                </div>
            )}

            <div className="form-card">
                <EmployeeForm onSubmit={handleSubmit} isEditing={false} />
            </div>
        </div>
    );
}

export default AddEmployee;
