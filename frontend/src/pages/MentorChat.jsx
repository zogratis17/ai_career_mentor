import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMessageCircle, FiRefreshCw } from 'react-icons/fi';
import './MentorChat.css';

function MentorChat({ userId }) {
  const [recommendations, setRecommendations] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recommendations');

  useEffect(() => {
    fetchMentorData();
  }, [userId]);

  const fetchMentorData = async () => {
    setLoading(true);
    try {
      const [recRes, sugRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/mentor/${userId}/recommendations`),
        axios.get(`http://localhost:5000/api/mentor/${userId}/learning-suggestions`)
      ]);
      
      setRecommendations(recRes.data.recommendations);
      setSuggestions(sugRes.data.suggestions);
    } catch (error) {
      console.error('Error fetching mentor data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="mentor-chat">
      <div className="mentor-header">
        <h1>🤖 Your AI Mentor</h1>
        <p>Personalized guidance for your AI career</p>
        <button className="btn btn-outline" onClick={fetchMentorData}>
          <FiRefreshCw /> Refresh Recommendations
        </button>
      </div>

      <div className="mentor-tabs">
        <button 
          className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Career Recommendations
        </button>
        <button 
          className={`tab ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Next Steps
        </button>
      </div>

      <div className="mentor-content">
        {activeTab === 'recommendations' && recommendations && (
          <div className="recommendations">
            <RecommendationSection 
              title="Immediate Actions"
              items={recommendations.immediate_actions}
              icon="⚡"
            />
            <RecommendationSection 
              title="Skill Gaps to Fill"
              items={recommendations.skill_gaps}
              icon="🎯"
            />
            <RecommendationSection 
              title="Learning Priorities"
              items={recommendations.learning_priorities}
              icon="📚"
            />
            <RecommendationSection 
              title="Recommended Projects"
              items={recommendations.project_ideas}
              icon="🛠️"
            />
            
            <div className="card mt-4">
              <h3>📈 Timeline</h3>
              <p className="large-text">{recommendations.timeline}</p>
            </div>

            <div className="card motivation">
              <h3>💪 Your Mentor Says</h3>
              <p>{recommendations.motivation}</p>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && suggestions && (
          <div className="suggestions">
            <div className="card">
              <h3>📖 Next Course</h3>
              <p className="highlight">{suggestions.next_course}</p>
              <p className="text-secondary">Difficulty: {suggestions.difficulty}</p>
              <p className="text-secondary">Estimated time: {suggestions.estimated_time}</p>
            </div>

            <div className="card">
              <h3>🧪 Practice Project</h3>
              <p className="highlight">{suggestions.practice_project}</p>
            </div>

            <div className="card">
              <h3>🎓 Expected Outcome</h3>
              <p>{suggestions.expected_outcome}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RecommendationSection({ title, items, icon }) {
  return (
    <div className="card mb-3">
      <h3>{icon} {title}</h3>
      <ul className="recommendation-list">
        {items.map((item, index) => (
          <li key={index}>
            <span className="list-number">{index + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MentorChat;
