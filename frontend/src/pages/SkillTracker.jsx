import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import SkillInput from '../components/SkillInput';
import './SkillTracker.css';

function SkillTracker({ userId }) {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProgress();
  }, [userId]);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/progress`);
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  // Group by skill
  const skillsData = {};
  progress.forEach(log => {
    if (!skillsData[log.skill]) {
      skillsData[log.skill] = {
        entries: [],
        totalHours: 0,
        totalProjects: 0,
        maxProficiency: 0
      };
    }
    skillsData[log.skill].entries.push(log);
    skillsData[log.skill].totalHours += log.hours_spent;
    skillsData[log.skill].totalProjects += log.projects_completed;
    skillsData[log.skill].maxProficiency = Math.max(skillsData[log.skill].maxProficiency, log.proficiency_level);
  });

  return (
    <div className="skill-tracker">
      <div className="tracker-header">
        <h1>📈 Skill Tracker</h1>
        <p>Track your learning progress across all skills</p>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FiPlus /> {showForm ? 'Cancel' : 'Add Skill'}
        </button>
      </div>

      {showForm && (
        <SkillInput userId={userId} onSkillAdded={fetchProgress} />
      )}

      <div className="skills-overview">
        {Object.keys(skillsData).length === 0 ? (
          <div className="card">
            <p className="text-secondary text-center">No skills tracked yet. Start tracking your learning journey!</p>
          </div>
        ) : (
          Object.entries(skillsData).map(([skill, data]) => (
            <div key={skill} className="skill-card">
              <div className="skill-header">
                <h3>{skill}</h3>
                <div className="proficiency-indicator">
                  <span className="level">{data.maxProficiency}</span>
                  <span className="label">/10</span>
                </div>
              </div>

              <div className="skill-stats">
                <div className="stat">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-value">{data.totalHours}</span>
                  <span className="stat-label">Hours</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🧪</span>
                  <span className="stat-value">{data.totalProjects}</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">📝</span>
                  <span className="stat-value">{data.entries.length}</span>
                  <span className="stat-label">Logs</span>
                </div>
              </div>

              <div className="proficiency-bar">
                <div className="bar-fill" style={{ width: `${(data.maxProficiency / 10) * 100}%` }}></div>
              </div>

              <div className="skill-entries">
                <h4>Recent Activity</h4>
                <ul>
                  {data.entries.slice(-3).map((entry, idx) => (
                    <li key={idx}>
                      <span>Level {entry.proficiency_level} • {entry.hours_spent}h</span>
                      <span className="date">{new Date(entry.created_at).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SkillTracker;
