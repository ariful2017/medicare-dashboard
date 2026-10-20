import Card from "../ui/Card";

export default function StatCard({ label, value, icon, color }) {
  return (
    <Card className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>

        <span className={`stat-icon ${color}`}>
          {icon}
        </span>
      </div>

      <div className="stat-value">{value}</div>
    </Card>
  );
}