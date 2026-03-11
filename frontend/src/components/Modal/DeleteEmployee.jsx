const DeleteEmployee = ({ setDeleteModal, confirmDelete, deleteMutation }) => {
    return (
        <>
            <p>Are you sure you want to delete this employee?</p>

            <div className="flex gap-4 mt-6">
                <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() =>
                        setDeleteModal({ isOpen: false, employeeId: null })
                    }
                >
                    Cancel
                </button>

                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={confirmDelete}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
            </div>
        </>
    );
};

export default DeleteEmployee;