import FilterableList from "../ui/FilterableList";
import DoctorCard from "./DoctorCard";

export default function DoctorList({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
}) {
  return (
    <FilterableList
      items={doctors}
      getKey={(doctor) => doctor.id}
      emptyMessage="No doctors match your search."
      renderItem={(doctor) => (
        <DoctorCard
          doctor={doctor}
          isSelected={String(doctor.id) === String(selectedDoctorId)}
          onSelectDoctor={onSelectDoctor}
        />
      )}
    />
  );
}