import { useState } from "react";

import { doctors as initialDoctors } from "./data/doctors";
import { appointments as initialAppointments } from "./data/appointments";

import Header from "./components/layout/Header";
import PageContainer from "./components/layout/PageContainer";
import Card from "./components/ui/Card";
import Badge from "./components/ui/Badge";

import StatGrid from "./components/stats/StatGrid";
import DoctorPanel from "./components/doctors/DoctorPanel";

export default function App() {
  const [doctors] = useState(initialDoctors);
  const [appointments] = useState(initialAppointments);

  // [REQ-3] Lifting state up: selectedDoctorId lives in App
  // and is shared by DoctorPanel and, in Part 2, AppointmentForm.
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  function handleSelectDoctor(doctorId) {
    setSelectedDoctorId(doctorId);
  }

  const recentAppointments = [...appointments]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  function getDoctor(doctorId) {
    return doctors.find((doctor) => doctor.id === doctorId);
  }

  return (
    <>
      <Header
        doctorCount={doctors.length}
        onCrashTest={() => {
          window.alert("Crash Test will be implemented in Part 3.");
        }}
      />

      <PageContainer>
        <StatGrid doctors={doctors} appointments={appointments} />

        <div className="main-grid">
          <DoctorPanel
            doctors={doctors}
            selectedDoctorId={selectedDoctorId}
            onSelectDoctor={handleSelectDoctor}
          />

          <Card
            title="Recent Appointments"
            action={
              <span className="panel-count">
                {appointments.length} total
              </span>
            }
          >
            {recentAppointments.length === 0 ? (
              <div className="empty-state">
                <h3>No appointments yet</h3>
                <p>Appointment booking will be added in Part 2.</p>
              </div>
            ) : (
              <div className="appointment-preview">
                {recentAppointments.map((appointment) => {
                  const doctor = getDoctor(appointment.doctorId);

                  return (
                    <div
                      className="preview-row"
                      key={appointment.id}
                    >
                      <div className="preview-avatar">
                        {appointment.patientName.charAt(0)}
                      </div>

                      <div className="preview-details">
                        <strong>{appointment.patientName}</strong>
                        <span>
                          {doctor?.name ?? "Unknown doctor"}
                        </span>
                        <span>
                          {appointment.date} · {appointment.time}
                        </span>
                      </div>

                      <Badge
                        variant={appointment.status.toLowerCase()}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}

            <p className="part-note">
              Full appointment management and booking form are coming
              in Parts 2 and 3.
            </p>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}