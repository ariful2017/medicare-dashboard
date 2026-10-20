export default function DoctorFilter({
  departments,
  selectedDepartment,
  onDepartmentChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="doctor-filters">
      <input
        type="search"
        className="search-input"
        placeholder="Search doctor by name..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search doctors by name"
      />

      <div className="filter-chips">
        {departments.map((department) => (
          <button
            type="button"
            key={department}
            className={`filter-chip ${
              selectedDepartment === department ? "active" : ""
            }`}
            onClick={() => onDepartmentChange(department)}
          >
            {department}
          </button>
        ))}
      </div>
    </div>
  );
}