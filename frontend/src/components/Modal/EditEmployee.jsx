import { useState, useEffect } from "react";
import employeeService from "../../services/employeeService";
import EmployeeForm from "../Employee/EmployeeForm";

const EditEmployee = ({ id, isOpen, onClose, onSuccess }) => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && id) {
            fetchEmployee();
        }
    }, [id, isOpen]);

    const fetchEmployee = async () => {
        try {
            setLoading(true);
            const response = await employeeService.getById(id);
            setEmployee(response.data);
        } catch (err) {
            setError("Employee not found.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        try {
            setError("");
            await employeeService.update(id, data);
            onSuccess(); // refresh parent
            onClose();   // close modal
        } catch (err) {
            if (err.response?.status === 400) {
                setError("Please check your input and try again.");
            } else {
                setError("Failed to update employee.");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Error */}
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <EmployeeForm
                    initialData={employee}
                    onSubmit={handleSubmit}
                    isEditing={true}
                />
            )}
        </>
    );
}

export default EditEmployee;