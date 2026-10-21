// src/components/appointments/AppointmentRow.jsx

import { formatDate, formatTime } from "../utils/format";

function getStatusClass(status) {
  // [REQ-2] Conditional-rendering style: switch chooses the status color.
  switch (status) {
    case "Pending":
      return "status-badge status-badge--pending";
    case "Confirmed":
      return "status-badge status-badge--confirmed";
    case "Completed":
      return "status-badge status-badge--completed";
    case "Cancelled":
      return "status-badge status-badge--cancelled";
    default:
      return "status-badge";
  }
}

export default function AppointmentRow({
  appointment,
  doctor,
  onStatusChange,
  onDelete,
}) {
  function handleDelete() {
    const confirmed = window.confirm(
      `Delete the appointment for ${appointment.patientName}?`
    );

    if (confirmed) {
      onDelete(appointment.id);
    }
  }

  return (
    <article className="appointment-row">
      <div className="appointment-row__patient">
        <strong>{appointment.patientName}</strong>
        <span>{appointment.phone}</span>
      </div>

      <div className="appointment-row__doctor">
        <strong>{doctor?.name || "Doctor unavailable"}</strong>
        <span>{doctor?.department || "—"}</span>
      </div>

      <div className="appointment-row__datetime">
        <strong>{formatDate(appointment.date)}</strong>
        <span>{formatTime(appointment.time)}</span>
      </div>

      <div className="appointment-row__status">
        <span className={getStatusClass(appointment.status)}>
          {appointment.status}
        </span>

        <label
          className="visually-hidden"
          htmlFor={`status-${appointment.id}`}
        >
          Change status for {appointment.patientName}
        </label>

        <select
          id={`status-${appointment.id}`}
          value={appointment.status}
          onChange={(event) =>
            onStatusChange(appointment.id, event.target.value)
          }
          aria-label={`Change appointment status for ${appointment.patientName}`}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        className="button button--danger"
        onClick={handleDelete}
      >
        Delete
      </button>
    </article>
  );
}