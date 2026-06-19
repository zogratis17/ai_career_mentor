import React, { useState } from 'react';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';
import './ProfileSetup.css';

function ProfileSetup({ onUserCreated }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    years_coding: 0,
    current_level: 'beginner',
    target_role: 'AI Engineer',
    current_skills: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'years_coding' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/', formData);
      onUserCreated(response.data.id);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup">
      <div className="setup-container">
        <div className="setup-header">
          <h1>Welcome to AI Mentor</h1>
          <p>Let's build your personalized AI career journey</p>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="form-step">
              <h2>Tell us about yourself</h2>
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Years of Coding Experience</label>
                <input
                  type="number"
                  name="years_coding"
                  value={formData.years_coding}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                />
              </div>

              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="btn btn-primary"
              >
                Next <FiArrowRight />
              </button>
            </div>
          )}

          {/* Step 2: AI Goals */}
          {step === 2 && (
            <div className="form-step">
              <h2>Your AI Career Goals</h2>

              <div className="form-group">
                <label>Current Level</label>
                <select 
                  name="current_level"
                  value={formData.current_level}
                  onChange={handleInputChange}
                >
                  <option value="beginner">Beginner - Just starting</option>
                  <option value="intermediate">Intermediate - Some ML knowledge</option>
                  <option value="advanced">Advanced - Experienced with ML</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Role</label>
                <select 
                  name="target_role"
                  value={formData.target_role}
                  onChange={handleInputChange}
                >
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Deep Learning Specialist">Deep Learning Specialist</option>
                  <option value="NLP Engineer">NLP Engineer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Known Skills (comma-separated)</label>
                <textarea
                  placeholder="e.g., Python, Data Analysis, SQL"
                  onChange={(e) => {
                    const skills = {};
                    e.target.value.split(',').forEach((skill) => {
                      const trimmed = skill.trim();
                      if (trimmed) skills[trimmed] = 5;
                    });
                    setFormData(prev => ({ ...prev, current_skills: skills }));
                  }}
                  rows="3"
                />
              </div>

              <div className="form-buttons">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating Profile...' : 'Get Started'}
                </button>
              </div>
            </div>
          )}

          {error && <div className="alert alert-warning">{error}</div>}
        </form>

        <div className="setup-features">
          <h3>What you'll get:</h3>
          <ul>
            <li>✨ AI-powered personalized recommendations</li>
            <li>💼 Job matches from Naukri & LinkedIn</li>
            <li>📊 Progress tracking & analytics</li>
            <li>🎯 Custom learning paths</li>
            <li>🚀 Career acceleration tips</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
