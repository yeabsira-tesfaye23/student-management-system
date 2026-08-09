import StudentCard from "./StudentCard";

function StudentList({
    students,
    search,
    setSearch,
    handleEdit,
    handleDelete
}) {
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="students-section">

            <div className="section-header">

                <div>
                    <h2>Students</h2>
                    <p>{students.length} students registered</p>
                </div>

                <input
                    className="search"
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

            </div>

            <div className="student-list">

                {filteredStudents.length === 0 ? (
                    <p className="empty">
                        No students found.
                    </p>
                ) : (
                    filteredStudents.map(student => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))
                )}

            </div>

        </section>
    );
}

export default StudentList;