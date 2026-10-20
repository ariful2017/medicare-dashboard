export default function EmptyState({
  title = "No results found",
  message = "Try changing your search or filter.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">⌕</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}