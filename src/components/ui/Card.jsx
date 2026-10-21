export default function Card({ title, action, children }) {
  return (
    <section className="panel-card">
      {(title || action) && (
        <div className="panel-card__header">
          {title && <h2>{title}</h2>}
          {action}
        </div>
      )}
      <div className="panel-card__body">{children}</div>
    </section>
  );
}