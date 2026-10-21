import { useRef, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  validateAppointmentDate,
  validateBookingForm,
} from "../utils/validators";
import { logError } from "../utils/logger";

const initialForm = {
  patientName: "",
  phone: "",
  date: "",
  time: "",
  note: "",
};

function getValidationMessage(form) {
  if (form.patientName.trim().length < 2) {
    return "Enter a patient name with at least 2 characters.";
  }

  if (!/^01\d{9}$/.test(form.phone.trim())) {
    return "Enter a valid 11-digit phone number starting with 01.";
  }

  if (!form.doctorId) return "Please select a doctor.";

  if (!validateAppointmentDate(form.date)) {
    return "Appointment date cannot be in the past.";
  }

  if (!form.time) return "Please select an appointment time.";

  if (form.note.length > 200) {
    return "The note cannot exceed 200 characters.";
  }

  return "";
}

function createAppointmentId() {
  return Date.now();
}

function getCreatedAt() {
  return new Date().toISOString();
}

export default function AppointmentForm({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
  onBookAppointment,
}) {
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // [REQ-8] Uncontrolled component: the report reference is read using useRef.
  const reportRef = useRef(null);
  const bookingForm = {
    ...form,
    doctorId: String(selectedDoctorId || ""),
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setErrorMessage("");
    setSuccessMessage("");

    if (name === "doctorId") {
      onSelectDoctor(value);
    } else {
      setForm((previous) => ({
        ...previous,
        [name]: value,
      }));
    }
  }

  function handleReset() {
    setForm(initialForm);
    setErrorMessage("");
    setSuccessMessage("");

    if (reportRef.current) {
      reportRef.current.value = "";
    }

    onSelectDoctor("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // [REQ-10] Form submit event handling.
    // try/catch keeps unexpected submit errors user-friendly.
    try {
      if (!validateBookingForm(bookingForm)) {
        setErrorMessage(getValidationMessage(bookingForm));
        return;
      }

      const selectedDoctor = doctors.find(
        (doctor) => String(doctor.id) === bookingForm.doctorId
      );

      if (!selectedDoctor || selectedDoctor.available === false) {
        setErrorMessage("Please select an available doctor.");
        return;
      }

      const reportReference = reportRef.current?.value.trim() || "";

      onBookAppointment({
        id: createAppointmentId(),
        patientName: form.patientName.trim(),
        phone: form.phone.trim(),
        doctorId: selectedDoctor.id,
        date: form.date,
        time: form.time,
        note: form.note.trim(),
        reportReference,
        status: "Pending",
        createdAt: getCreatedAt(),
      });

      setSuccessMessage(
        `Appointment booked successfully for ${form.patientName.trim()}.`
      );
      handleReset();
    } catch (error) {
      logError("AppointmentForm.handleSubmit", error);
      setErrorMessage(
        "We could not book the appointment. Please check the details and try again."
      );
    }
  }

  const availableDoctors = doctors.filter(
    (doctor) => doctor.available !== false
  );

  const formIsValid = validateBookingForm(bookingForm);

  return (
    <Card title="Book an Appointment">
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="patientName">Patient name *</label>
          <input
            id="patientName"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
            autoComplete="name"
            required
          />
          {form.patientName && form.patientName.trim().length < 2 && (
            <small className="field-error">
              Name must contain at least 2 characters.
            </small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            maxLength={11}
            required
          />
          {form.phone && !/^01\d{9}$/.test(form.phone) && (
            <small className="field-error">
              Enter 11 digits starting with 01.
            </small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="doctorId">Doctor *</label>
          <select
            id="doctorId"
            name="doctorId"
            value={bookingForm.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select a doctor</option>
            {availableDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} — {doctor.department}
              </option>
            ))}
          </select>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="date">Appointment date *</label>
            <input
              id="date"
              name="date"
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="time">Appointment time *</label>
            <input
              id="time"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="note">Note (optional)</label>
          <textarea
            id="note"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Add any relevant information"
            maxLength={200}
            rows={3}
          />
          <small className="character-count">
            {form.note.length}/200 characters
          </small>
        </div>

        <div className="form-field">
          <label htmlFor="reportReference">
            Report / reference (optional)
          </label>
          <input
            id="reportReference"
            type="text"
            ref={reportRef}
            placeholder="Enter a report reference"
          />
          <small className="field-hint">
            This input is uncontrolled and is read through useRef.
          </small>
        </div>

        {errorMessage && (
          <p className="form-message form-message--error" role="alert">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="form-message form-message--success" role="status">
            {successMessage}
          </p>
        )}

        <div className="form-actions">
          <Button type="submit" disabled={!formIsValid}>
            Book Appointment
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}