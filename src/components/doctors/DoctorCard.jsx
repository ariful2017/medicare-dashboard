import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function DoctorCard({
  doctor,
  selected,
  onSelectDoctor,
}) {
  return (
    <Card className={`doctor-card ${selected ? "selected" : ""}`}>
      <div className="doctor-card-main">
        <div className="doctor-avatar">
          {doctor.name
            .replace("Dr. ", "")
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
          <span className="doctor-department">
            {doctor.department}
          </span>
        </div>
      </div>

      <div className="doctor-card-footer">
        <div>
          <span className="fee-label">Visiting fee</span>
          <strong>৳{doctor.visitingFee.toLocaleString("en-BD")}</strong>
        </div>

        {doctor.available ? (
          <Badge variant="completed">Available</Badge>
        ) : (
          <Badge variant="cancelled">Not available</Badge>
        )}
      </div>

      <Button
        disabled={!doctor.available}
        variant={selected ? "secondary" : "primary"}
        onClick={() => onSelectDoctor(doctor.id)}
      >
        {selected ? "Selected" : "Select Doctor"}
      </Button>
    </Card>
  );
}