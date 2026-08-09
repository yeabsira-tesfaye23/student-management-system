function StudentCard({ student, handleEdit, handleDelete }) {
    return (
        <div className="student-card">

            <div className="student-info">

                <div className="avatar">
                    {student.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h3>{student.name}</h3>

                    <p>
                        {student.department} · {student.year}
                    </p>
                </div>

            </div>

            <div className="actions">

                <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default StudentCard;