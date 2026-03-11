function StatsCard({ title, value, icon, gradient }) {
    return (
        <div className="stats-card" style={{ background: gradient }}>
            <div className="stats-icon">{icon}</div>
            <div className="stats-info">
                <h3>{value}</h3>
                <p>{title}</p>
            </div>
        </div>
    );
}

export default StatsCard;
