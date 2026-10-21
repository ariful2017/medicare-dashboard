import { useState } from "react";
import Header from "./components/layout/Header";
import PageContainer from "./components/layout/PageContainer";
import DoctorPanel from "./components/doctors/DoctorPanel";
import AppointmentForm from "./components/appointments/AppointmentForm";
import AppointmentList from "./components/appointments/AppointmentList";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Card from "./components/ui/Card";
import { doctors as initialDoctors } from "./data/doctors";
import { appointments as initialAppointments } from "./data/appointments";
import { logInfo, logWarn } from "./components/utils/logger";
import { getGreeting } from "./components/utils/format";
import DoctorList from "./components/doctors/DoctorList";

export default function App() {
  const [doctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);

  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const [lastBookedMessage, setLastBookedMessage] = useState("");

  const pendingCount = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  function handleSelectDoctor(doctorId) {
    setSelectedDoctorId(doctorId);
  }

  function handleBookAppointment(newAppointment) {
   
    setAppointments((previous) => [newAppointment, ...previous]);
    setLastBookedMessage("Your new appointment has been added.");
    logInfo("App.handleBookAppointment", "Appointment created", {
      appointmentId: newAppointment.id,
    });
  }

  function handleStatusChange(appointmentId, newStatus) {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );

    logInfo("App.handleStatusChange", "Appointment status changed", {
      appointmentId,
      newStatus,
    });
  }

  function handleDelete(appointmentId) {
    const exists = appointments.some(
      (appointment) => appointment.id === appointmentId
    );

    if (!exists) {
      logWarn("App.handleDelete", "Appointment not found", {
        appointmentId,
      });
      return;
    }

    setAppointments((previous) =>
      previous.filter((appointment) => appointment.id !== appointmentId)
    );

    logInfo("App.handleDelete", "Appointment deleted", {
      appointmentId,
    });
  }

  return (
    <>
      <Header />

      <PageContainer>
        <section className="welcome-section">
          <div>
            <p className="eyebrow">CLINIC OVERVIEW</p>
            <h1>Appointment Dashboard</h1>

            
            <p className="welcome-copy">
              {(() => {
                if (appointments.length === 0) {
                  return "No appointments scheduled yet.";
                }

                if (pendingCount > 0) {
                  return `${pendingCount} appointment${
                    pendingCount === 1 ? "" : "s"
                  } waiting for attention.`;
                }

                return "Your appointment list is up to date.";
              })()}
            </p>
          </div>

          <span className="greeting">{getGreeting()}, Reception</span>
        </section>

        <section className="stats-grid" aria-label="Clinic statistics">
          <Card>
            <p className="stat-label">Total doctors</p>
            <p className="stat-value">{doctors.length}</p>
          </Card>

          <Card>
            <p className="stat-label">Appointments</p>
            <p className="stat-value">{appointments.length}</p>
          </Card>

          <Card>
            <p className="stat-label">Pending</p>
            <p className="stat-value">{pendingCount}</p>
          </Card>

          <Card>
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completedCount}</p>
          </Card>
        </section>

        {lastBookedMessage && (
          <p className="form-message form-message--success" role="status">
            {lastBookedMessage}
            <button
              type="button"
              className="text-button"
              onClick={() => setLastBookedMessage("")}
            >
              Dismiss
            </button>
          </p>
        )}

        <section className="dashboard-main">
          <div className="dashboard-column">
            <DoctorPanel
              doctors={doctors}
              renderDoctorList={(filteredDoctors) => (
                <DoctorList
                doctors={filteredDoctors}
                selectedDoctorId={selectedDoctorId}
                onSelectDoctor={handleSelectDoctor}
                 />
                )}
             />

            <AppointmentForm
              doctors={doctors}
              selectedDoctorId={selectedDoctorId}
              onSelectDoctor={handleSelectDoctor}
              onBookAppointment={handleBookAppointment}
            />
          </div>

          <div className="dashboard-column">
            <ErrorBoundary context="AppointmentsPanel">
              <AppointmentList
                appointments={appointments}
                doctors={doctors}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            </ErrorBoundary>
        </div>
        </section>
      </PageContainer>
    </>
  );
}