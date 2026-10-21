export default function DoctorCard({
  doctor,
  isSelected,
  onSelectDoctor,
}) {
  const unavailable = doctor.available === false;

  return (
    <article
      className={`doctor-card ${isSelected ? "doctor-card--selected" : ""}`}
    >
      <div className="doctor-card__details">
        <strong>{doctor.name}</strong>
        <span>{doctor.department}</span>
        <span className={unavailable ? "doctor-unavailable" : "doctor-available"}>
          {unavailable ? "Unavailable" : "Available"}
        </span>
      </div>

      <button
        type="button"
        className={`button ${
          isSelected ? "button--secondary" : "button--primary"
        }`}
        disabled={unavailable}
        onClick={() => onSelectDoctor(doctor.id)}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </article>
  );
}