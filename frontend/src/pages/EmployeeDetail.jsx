import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../common/Modal";
import employeeService from "../services/employeeService";
import EditEmployee from "../components/Modal/EditEmployee";
import DeleteEmployee from "../components/Modal/DeleteEmployee";
import { useAuth } from "../context/AuthContext";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    employeeId: null,
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  // 🔥 Fetch employee
  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeService.getById(id).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  // 🔥 Delete employee
  const deleteMutation = useMutation({
    mutationFn: (employeeId) => employeeService.delete(employeeId),

    onSuccess: (_, employeeId) => {
      // ❌ Remove deleted employee cache
      queryClient.removeQueries({ queryKey: ["employee", employeeId] });

      // 🔄 Refresh employee list
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      // 🚀 Navigate back to employee list
      navigate("/employees");
    },
  });

  const confirmDelete = () => {
    deleteMutation.mutate(deleteModal.employeeId);
  };

  const formatSalary = (salary) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);

  const getInitials = (firstName, lastName) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="error-container">
        <h2>Employee not found</h2>
        <Link to="/employees" className="btn btn-primary">
          Back to Employees
        </Link>
      </div>
    );
  }

  return (
    <div className="employee-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-profile">
          <div className="detail-avatar">
            {getInitials(employee.firstName, employee.lastName)}
          </div>

          <div className="detail-name-section">
            <h1>
              {employee.firstName} {employee.lastName}
            </h1>

            <p className="detail-position">{employee.position}</p>

            <span
              className={`status-badge large ${employee.isActive ? "active" : "inactive"
                }`}
            >
              {employee.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="detail-actions">
            <button
              onClick={() => setIsEditOpen(true)}
              className="btn btn-primary"
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                setDeleteModal({
                  isOpen: true,
                  employeeId: employee.id,
                })
              }
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <div className="detail-info-grid">
          <div className="info-card">
            <div className="info-label">Email</div>
            <div className="info-value">{employee.email}</div>
          </div>

          <div className="info-card">
            <div className="info-label">Phone</div>
            <div className="info-value">{employee.phone || "N/A"}</div>
          </div>

          <div className="info-card">
            <div className="info-label">Department</div>
            <div className="info-value">{employee.department}</div>
          </div>

          {
            user.role === "Admin" && (
              <div className="info-card">
                <div className="info-label">Salary</div>
                <div className="info-value salary">
                  {formatSalary(employee.salary)}
                </div>
              </div>
            )
          }

          <div className="info-card">
            <div className="info-label">Date of Joining</div>
            <div className="info-value">
              {new Date(employee.dateOfJoining).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="info-card">
            <div className="info-label">Created At</div>
            <div className="info-value">
              {new Date(employee.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

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

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Employee"
        style={{ maxWidth: "max-content" }}
      >
        <EditEmployee
          id={id}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["employee", id] });
            queryClient.invalidateQueries({ queryKey: ["employees"] });
          }}
        />
      </Modal>
    </div>
  );
}

export default EmployeeDetail;