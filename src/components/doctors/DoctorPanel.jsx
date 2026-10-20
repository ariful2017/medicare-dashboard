import { useMemo, useState } from "react";
import Card from "../ui/Card";
import DoctorFilter from "./DoctorFilter";
import DoctorList from "./DoctorList";

export default function DoctorPanel({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
}) {
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = useMemo(
    () => ["All", ...new Set(doctors.map((doctor) => doctor.department))],
    [doctors]
  );

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All" ||
      doctor.department === selectedDepartment;

    return matchesName && matchesDepartment;
  });

  return (
    <Card
      title="Our Doctors"
      action={
        <span className="panel-count">
          {filteredDoctors.length} doctors
        </span>
      }
    >
      <DoctorFilter
        departments={departments}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        search={search}
        onSearchChange={setSearch}
      />

      <DoctorList
        doctors={filteredDoctors}
        selectedDoctorId={selectedDoctorId}
        onSelectDoctor={onSelectDoctor}
      />
    </Card>
  );
}