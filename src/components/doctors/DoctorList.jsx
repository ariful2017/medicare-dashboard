import DoctorCard from "./DoctorCard";
import FilterableList from "../ui/FilterableList";

export default function DoctorList({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
}) {
  return (
    <FilterableList
      items={doctors}
      emptyTitle="No doctors found"
      emptyMessage="Try another name or department."
      renderItem={(doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          selected={selectedDoctorId === doctor.id}
          onSelectDoctor={onSelectDoctor}
        />
      )}
    />
  );
}