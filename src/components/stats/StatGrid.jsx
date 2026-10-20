import StatCard from "./StatCard";

export default function StatGrid({ doctors, appointments }) {
  // All summary numbers are calculated from current data.
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const stats = [
    {
      label: "Total Doctors",
      value: totalDoctors,
      icon: "✚",
      color: "teal",
    },
    {
      label: "Total Appointments",
      value: totalAppointments,
      icon: "▦",
      color: "blue",
    },
    {
      label: "Pending Appointments",
      value: pendingAppointments,
      icon: "◷",
      color: "amber",
    },
    {
      label: "Completed Appointments",
      value: completedAppointments,
      icon: "✓",
      color: "green",
    },
  ];

  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}