import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProgressAnalytics.css';

function ProgressAnalytics({ userId }) {
  const [analytics, setAnalytics] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, milestonesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/progress/${userId}/analytics`),
        axios.get(`http://localhost:5000/api/progress/${userId}/milestones`)
      ]);
      
      setAnalytics(analyticsRes.data);
      setMilestones(milestonesRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>📊 Your Progress Analytics</h1>
        <p>Track your learning journey in detail</p>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-box">
          <div className="stat-number">{milestones?.total_hours}</div>
          <div className="stat-text">Total Hours</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{milestones?.total_projects}</div>
          <div className="stat-text">Projects Built</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{analytics?.skills_tracked}</div>
          <div className="stat-text">Skills Tracking</div>
        </div>
      </div>

      {/* Skills Analytics */}
      <section className="card">
        <h2>Skills Breakdown</h2>
        <div className="skills-analytics">
          {analytics?.skill_analytics.map((skill, index) => (
            <div key={index} className="skill-analytics-item">
              <div className="skill-name">
                <strong>{skill.skill}</strong>
                <span className="level">{skill.max_proficiency}/10</span>
              </div>
              <div className="analytics-grid">
                <div className="metric">
                  <span className="metric-value">{skill.total_hours}</span>
                  <span className="metric-label">Hours</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{skill.total_projects}</span>
                  <span className="metric-label">Projects</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{skill.entries}</span>
                  <span className="metric-label">Sessions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="card">
        <h2>🎖️ Your Achievements</h2>
        <div className="milestones-list">
          {milestones?.milestones.map((milestone, index) => (
            <div key={index} className={`milestone ${milestone.achieved ? 'achieved' : 'locked'}`}>
              <div className="milestone-icon">
                {milestone.achieved ? '🏆' : '🔒'}
              </div>
              <div className="milestone-content">
                <strong>{milestone.name}</strong>
                <p>{milestone.description}</p>
              </div>
              {milestone.achieved && <div className="checkmark">✓</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="card insights-section">
        <h2>💡 Your Insights</h2>
        <div className="insights-grid">
          <div className="insight-box">
            <span className="icon">📈</span>
            <h4>Consistency</h4>
            <p>You're making steady progress! Keep up the momentum by learning at least 2-3 hours per week.</p>
          </div>
          <div className="insight-box">
            <span className="icon">🎯</span>
            <h4>Next Goal</h4>
            <p>Focus on deepening your skills. Aim to reach proficiency level 8+ in your core skills.</p>
          </div>
          <div className="insight-box">
            <span className="icon">🚀</span>
            <h4>Recommendation</h4>
            <p>Time to build your portfolio! Create 2-3 projects that showcase your strongest skills.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgressAnalytics;
