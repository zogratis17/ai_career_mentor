import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LearningPaths.css';

function LearningPaths({ userId }) {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchRoadmap = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/progress/${userId}/roadmap`);
      setRoadmap(response.data);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="learning-paths">
      <div className="paths-header">
        <h1>🎯 Your AI Career Roadmap</h1>
        <p>Target Role: <strong>{roadmap?.target_role}</strong></p>
      </div>

      <div className="roadmap-timeline">
        {roadmap?.roadmap.map((phase, index) => (
          <div key={index} className={`phase-item ${phase.completed ? 'completed' : ''}`}>
            <div className="phase-marker">
              {phase.completed ? '✓' : index + 1}
            </div>
            
            <div className="phase-content">
              <h3>Phase {phase.phase}: {phase.name}</h3>
              <p className="duration">⏱️ {phase.duration_weeks} weeks</p>
              
              <div className="skills-list">
                <p className="skills-label">Skills to Master:</p>
                <div className="skills">
                  {phase.skills.map((skill, i) => (
                    <span key={i} className="phase-skill">{skill}</span>
                  ))}
                </div>
              </div>

              {phase.completed && (
                <div className="badge badge-success">✓ Completed</div>
              )}
            </div>

            {index < roadmap.roadmap.length - 1 && (
              <div className="phase-connector"></div>
            )}
          </div>
        ))}
      </div>

      <div className="roadmap-tips">
        <div className="card">
          <h3>💡 Quick Tips for Success</h3>
          <ul>
            <li>Dedicate 10-15 hours per week to learning</li>
            <li>Build projects to reinforce concepts</li>
            <li>Join AI communities for support</li>
            <li>Practice regularly and track progress</li>
            <li>Focus on one phase at a time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LearningPaths;
