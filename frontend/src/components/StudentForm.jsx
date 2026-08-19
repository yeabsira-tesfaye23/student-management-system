function StudentForm({
    form,
    editingId,
    handleChange,
    handleSubmit,
    cancelEdit,
    isAdmin
}) {
    if (!isAdmin) {
        return null;
    }

    return (
        <section className="form-section">
            <h2>
                {editingId ? "Edit Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Student name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                />

                <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                </select>

                <button type="submit">
                    {editingId ? "Update Student" : "Add Student"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>
                )}
            </form>
        </section>
    );
}

export default StudentForm;