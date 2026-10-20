import Button from "../ui/Button";

export default function Header({ doctorCount, onCrashTest }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-logo">M+</div>

          <div>
            <h1>MediCare Clinic</h1>
            <p>Appointment Management System</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="clinic-status">
            <span className="status-dot" />
            Clinic Dashboard
          </div>

          <Button variant="danger" onClick={onCrashTest}>
            Crash Test
          </Button>
        </div>
      </div>

      <div className="welcome-bar">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Manage your clinic and appointments in one place.</p>
        </div>

        <span className="doctor-count">
          {doctorCount} doctors registered
        </span>
      </div>
    </header>
  );
}