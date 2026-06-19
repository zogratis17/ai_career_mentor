import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiBook, FiBriefcase, FiCheckCircle, FiClock } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import './Dashboard.css';

function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, [userId]);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/dashboard`);
      setUser(response.data.user);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user || !stats) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const levelColors = {
    beginner: '#f59e0b',
    intermediate: '#3b82f6',
    advanced: '#10b981'
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.name}! 👋</h1>
          <p className="text-secondary">Your AI career journey in progress</p>
        </div>
        <div className="level-badge" style={{ background: levelColors[user.current_level] }}>
          {user.current_level.toUpperCase()}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={FiClock}
          label="Total Learning Hours"
          value={stats.total_hours_learned}
          unit="h"
          color="primary"
        />
        <StatCard 
          icon={FiCheckCircle}
          label="Projects Completed"
          value={stats.total_projects}
          unit=""
          color="success"
        />
        <StatCard 
          icon={FiTrendingUp}
          label="Avg Proficiency"
          value={stats.average_proficiency}
          unit="/10"
          color="secondary"
        />
        <StatCard 
          icon={FiBook}
          label="Skills Learning"
          value={stats.skills_learning}
          unit=""
          color="warning"
        />
      </div>

      <div className="dashboard-grid">
        <section className="card">
          <h3>Your Target Role</h3>
          <p className="large-text">{user.target_role}</p>
          <p className="text-secondary">Based on your goals and skills</p>
        </section>

        <section className="card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <a href="/mentor" className="action-btn">
              <span>🤖</span>
              <span>Get AI Recommendations</span>
            </a>
            <a href="/jobs" className="action-btn">
              <span>💼</span>
              <span>View Job Matches</span>
            </a>
            <a href="/skills" className="action-btn">
              <span>📈</span>
              <span>Update Skills</span>
            </a>
          </div>
        </section>

        <section className="card">
          <h3>Your Skills</h3>
          <div className="skills-list">
            {Object.entries(user.current_skills || {}).map(([skill, level]) => (
              <div key={skill} className="skill-item">
                <span>{skill}</span>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ width: `${(level / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="skill-level">{level}/10</span>
              </div>
            ))}
            {Object.keys(user.current_skills || {}).length === 0 && (
              <p className="text-secondary">No skills tracked yet. Start tracking!</p>
            )}
          </div>
        </section>

        <section className="card">
          <h3>Learning Insights</h3>
          <div className="insights">
            <div className="insight-item">
              <span className="insight-icon">📊</span>
              <div>
                <strong>Consistency</strong>
                <p className="text-secondary">Keep learning regularly for best results</p>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">🎯</span>
              <div>
                <strong>Focus</strong>
                <p className="text-secondary">Master 3-4 core skills for {user.target_role}</p>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">💡</span>
              <div>
                <strong>Projects</strong>
                <p className="text-secondary">Build real projects to showcase skills</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
