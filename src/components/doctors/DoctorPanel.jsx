import { useMemo, useState } from "react";
import Card from "../ui/Card";

export default function DoctorPanel({ doctors, renderDoctorList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");

  const departments = useMemo(
    () => ["All", ...new Set(doctors.map((doctor) => doctor.department))],
    [doctors]
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesName = doctor.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesDepartment =
        activeDepartment === "All" ||
        doctor.department === activeDepartment;

      return matchesName && matchesDepartment;
    });
  }, [doctors, searchTerm, activeDepartment]);

  return (
    <Card title="Our Doctors">
      <div className="doctor-search">
        <label htmlFor="doctor-search">Search doctors</label>
        <input
          id="doctor-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name"
        />
      </div>

      <div className="doctor-departments" aria-label="Filter by department">
        {departments.map((department) => (
          <button
            key={department}
            type="button"
            className={`filter-chip ${
              activeDepartment === department ? "filter-chip--active" : ""
            }`}
            onClick={() => setActiveDepartment(department)}
            aria-pressed={activeDepartment === department}
          >
            {department}
          </button>
        ))}
      </div>

      {/* [REQ-9] Render prop: App provides the list renderer directly. */}
      {renderDoctorList(filteredDoctors)}
    </Card>
  );
}