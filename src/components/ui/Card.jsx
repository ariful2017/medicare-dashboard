export default function Card({ title, action, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      <div className="card-heading">
        <h2>{title}</h2>
        {action && <div>{action}</div>}
      </div>

      <div className="card-content">{children}</div>
    </section>
  );
}