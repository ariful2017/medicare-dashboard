import CrashTest from "../error/CrashTest";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <a className="brand" href="/" aria-label="MediCare dashboard home">
          <span className="brand__icon" aria-hidden="true">+</span>
          <span>
            <strong>MediCare</strong>
            <small>Clinic dashboard</small>
          </span>
        </a>

        <div className="header-actions">
          <span className="header-status">
            <span className="status-dot" />
            Front desk
          </span>
          <CrashTest />
        </div>
      </div>
    </header>
  );
}