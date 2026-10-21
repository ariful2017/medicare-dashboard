// src/components/appointments/AppointmentList.jsx

import { useMemo, useState } from "react";
import Card from "../ui/Card";
import FilterableList from "../ui/FilterableList";
import EmptyState from "../ui/EmptyState";
import AppointmentRow from "./AppointmentRow";

const STATUSES = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export default function AppointmentList({
  appointments,
  doctors,
  onStatusChange,
  onDelete,
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const counts = useMemo(() => {
    return appointments.reduce(
      (result, appointment) => {
        result.All += 1;

        if (result[appointment.status] !== undefined) {
          result[appointment.status] += 1;
        }

        return result;
      },
      {
        All: 0,
        Pending: 0,
        Confirmed: 0,
        Completed: 0,
        Cancelled: 0,
      }
    );
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          activeFilter === "All" || appointment.status === activeFilter
      )
      .slice()
      .sort((a, b) => {
        const dateA = new Date(
          `${a.date}T${a.time || "00:00"}:00`
        ).getTime();
        const dateB = new Date(
          `${b.date}T${b.time || "00:00"}:00`
        ).getTime();

        return dateB - dateA;
      });
  }, [appointments, activeFilter]);

  return (
    <Card title="Appointments">
      <div className="appointment-filters" aria-label="Filter appointments">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={`filter-chip ${
              activeFilter === status ? "filter-chip--active" : ""
            }`}
            onClick={() => setActiveFilter(status)}
            aria-pressed={activeFilter === status}
          >
            {status} <span>{counts[status]}</span>
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <EmptyState message="No appointments yet. Book the first one from the form." />
      ) : (
        <FilterableList
          items={filteredAppointments}
          getKey={(appointment) => appointment.id}
          renderItem={(appointment) => {
            const doctor = doctors.find(
              (item) =>
                String(item.id) === String(appointment.doctorId)
            );

            return (
              <AppointmentRow
                appointment={appointment}
                doctor={doctor}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            );
          }}
          emptyMessage="No appointments found."
        />
      )}
    </Card>
  );
}