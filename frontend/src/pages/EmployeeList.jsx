import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EmployeeCard from "../components/Employee/EmployeeCard";
import SearchBar from "../components/SearchBar";
import Modal from "../common/Modal";
import employeeService from "../services/employeeService";
import EditEmployeeModal from "../components/Modal/EditEmployee";
import DeleteEmployee from "../components/Modal/DeleteEmployee";

function EmployeeList() {
    const queryClient = useQueryClient();

    const [searchQuery, setSearchQuery] = useState("");

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        employeeId: null,
    });

    const [editModal, setEditModal] = useState({
        isOpen: false,
        employee: null,
    });

    // Fetch employees
    const { data: employees = [], isLoading } = useQuery({
        queryKey: ["employees", searchQuery],
        queryFn: () =>
            searchQuery.trim()
                ? employeeService.search(searchQuery).then((res) => res.data)
                : employeeService.getAll().then((res) => res.data),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });

    // Delete employee
    const deleteMutation = useMutation({
        mutationFn: (id) => employeeService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["employees"]);
            setDeleteModal({ isOpen: false, employeeId: null });
        },
    });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const confirmDelete = () => {
        deleteMutation.mutate(deleteModal.employeeId);
    };

    const openEditModal = (employee) => {
        setEditModal({
            isOpen: true,
            employee: employee,
        });
    };

    const closeEditModal = () => {
        setEditModal({
            isOpen: false,
            employee: null,
        });
    };

    if (isLoading && employees.length === 0) {
        return <p>Loading employees...</p>;
    }

    return (
        <div className="px-0 py-0">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Employees</h1>
                    <p className="text-gray-500">{employees.length} employees found</p>
                </div>
            </div>

            <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search employees..."
            />

            {employees.length === 0 ? (
                <div className="mt-10 text-center">
                    <h3>No employees found</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {employees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onDelete={(id) =>
                                setDeleteModal({ isOpen: true, employeeId: id })
                            }
                            onEdit={() => openEditModal(employee)}
                        />
                    ))}
                </div>
            )}

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, employeeId: null })}
                title="Confirm Delete"
            >
                <DeleteEmployee
                    setDeleteModal={setDeleteModal}
                    confirmDelete={confirmDelete}
                    deleteMutation={deleteMutation}
                />
            </Modal>

            {/* Edit Employee Modal */}
            <Modal
                isOpen={editModal.isOpen}
                onClose={closeEditModal}
                title="Edit Employee"
                style={{ maxWidth: "max-content" }}
            >
                <EditEmployeeModal
                    id={editModal.employee?.id}
                    isOpen={editModal.isOpen}
                    onClose={closeEditModal}
                    onSuccess={() => queryClient.invalidateQueries(["employees"])}
                />
            </Modal>
        </div>
    );
}

export default EmployeeList;