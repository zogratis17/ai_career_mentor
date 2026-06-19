import React, { useState } from 'react';
import axios from 'axios';
import { FiSave } from 'react-icons/fi';
import './SkillInput.css';

function SkillInput({ userId, onSkillAdded }) {
  const [skill, setSkill] = useState('');
  const [proficiency, setProficiency] = useState(5);
  const [hours, setHours] = useState(0);
  const [projects, setProjects] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skill.trim()) return;

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/users/${userId}/progress`, {
        skill: skill.trim(),
        proficiency_level: proficiency,
        hours_spent: hours,
        projects_completed: projects,
        resources_used: []
      });

      setSkill('');
      setProficiency(5);
      setHours(0);
      setProjects(0);
      onSkillAdded?.();
    } catch (error) {
      console.error('Error adding skill:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="skill-input" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Skill Name</label>
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="e.g., Python, Machine Learning, TensorFlow"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Proficiency (0-10)</label>
          <input
            type="range"
            min="0"
            max="10"
            value={proficiency}
            onChange={(e) => setProficiency(Number(e.target.value))}
          />
          <span className="proficiency-value">{proficiency}/10</span>
        </div>

        <div className="form-group">
          <label>Hours Spent</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Projects</label>
          <input
            type="number"
            value={projects}
            onChange={(e) => setProjects(Number(e.target.value))}
            min="0"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        <FiSave /> {loading ? 'Adding...' : 'Add Skill'}
      </button>
    </form>
  );
}

export default SkillInput;
