export default function FilterableList({
  items,
  renderItem,
  emptyTitle = "No results found",
  emptyMessage = "Try changing your filters.",
}) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌕</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="filterable-list">
      {items.map((item) => renderItem(item))}
    </div>
  );
}