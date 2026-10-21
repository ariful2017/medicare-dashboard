export default function FilterableList({
  items,
  renderItem,
  getKey,
  emptyMessage = "No items to display.",
}) {
  if (items.length === 0) {
    return <p className="empty-list-message">{emptyMessage}</p>;
  }

  return (
    <div className="filterable-list">
      {items.map((item) => (
        <div key={getKey(item)} className="filterable-list__item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}