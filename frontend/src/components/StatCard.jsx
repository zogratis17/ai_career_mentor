import React from 'react';
import './StatCard.css';

function StatCard({ icon: Icon, label, value, unit = '', trend = null, color = 'primary' }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">
          {value}
          {unit && <span className="stat-unit">{unit}</span>}
        </h3>
        {trend && (
          <span className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
