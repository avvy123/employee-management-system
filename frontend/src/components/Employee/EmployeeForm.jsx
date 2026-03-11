import { useState, useEffect } from 'react';

function EmployeeForm({ initialData, onSubmit, isEditing }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        salary: '',
        dateOfJoining: '',
        isActive: true,
    });

    const [errors, setErrors] = useState({});

    const departments = ['Engineering', 'HR', 'Design', 'Marketing', 'Finance', 'Operations', 'Sales'];

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                department: initialData.department || '',
                position: initialData.position || '',
                salary: initialData.salary || '',
                dateOfJoining: initialData.dateOfJoining
                    ? new Date(initialData.dateOfJoining).toISOString().split('T')[0]
                    : '',
                isActive: initialData.isActive ?? true,
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.position.trim()) newErrors.position = 'Position is required';
        if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Valid salary is required';
        if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const submitData = {
                ...formData,
                salary: parseFloat(formData.salary),
                dateOfJoining: new Date(formData.dateOfJoining).toISOString(),
            };
            onSubmit(submitData);
        }
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={errors.department ? 'error' : ''}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    {errors.department && <span className="error-text">{errors.department}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="position">Position *</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Enter position"
                        className={errors.position ? 'error' : ''}
                    />
                    {errors.position && <span className="error-text">{errors.position}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary (USD) *</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Enter salary"
                        className={errors.salary ? 'error' : ''}
                    />
                    {errors.salary && <span className="error-text">{errors.salary}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfJoining">Date of Joining *</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        className={errors.dateOfJoining ? 'error' : ''}
                    />
                    {errors.dateOfJoining && <span className="error-text">{errors.dateOfJoining}</span>}
                </div>

                {isEditing && (
                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                            />
                            <span className="checkbox-custom"></span>
                            Active Employee
                        </label>
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                    </svg>
                    {isEditing ? 'Update Employee' : 'Add Employee'}
                </button>
            </div>
        </form>
    );
}

export default EmployeeForm;
