import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './App.css';

// Pages
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';
import MentorChat from './pages/MentorChat';
import JobRecommendations from './pages/JobRecommendations';
import SkillTracker from './pages/SkillTracker';
import LearningPaths from './pages/LearningPaths';
import ProgressAnalytics from './pages/ProgressAnalytics';

// Navigation
import Navigation from './components/Navigation';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userLoaded, setUserLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(true);

  useEffect(() => {
    if (userId) {
      setUserLoaded(true);
    }
  }, [userId]);

  const handleUserCreated = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
    setUserLoaded(true);
  };

  return (
    <Router>
      <div className="app">
        {userLoaded && <Navigation userId={userId} isOpen={navOpen} onToggle={() => setNavOpen(!navOpen)} />}
        
        <main className={`main-content ${navOpen ? 'with-nav' : 'full-width'}`}>
          {!navOpen && (
            <button className="floating-menu-toggle" onClick={() => setNavOpen(true)} title="Show menu">
              <FiMenu size={24} />
            </button>
          )}
          <Routes>
            <Route 
              path="/" 
              element={userId ? <Dashboard userId={userId} /> : <ProfileSetup onUserCreated={handleUserCreated} />} 
            />
            <Route 
              path="/setup" 
              element={<ProfileSetup onUserCreated={handleUserCreated} />} 
            />
            {userId && (
              <>
                <Route path="/mentor" element={<MentorChat userId={userId} />} />
                <Route path="/jobs" element={<JobRecommendations userId={userId} />} />
                <Route path="/skills" element={<SkillTracker userId={userId} />} />
                <Route path="/learning" element={<LearningPaths userId={userId} />} />
                <Route path="/analytics" element={<ProgressAnalytics userId={userId} />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
