import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiBriefcase, FiTrendingUp, FiBook, FiBarChart2, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './Navigation.css';

function Navigation({ userId, isOpen, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/setup');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navigation ${isOpen ? 'open' : 'closed'}`}>
      <div className="nav-header">
        <h1 className="nav-brand">🚀 AI Mentor</h1>
        <p className="nav-tagline">Your AI Career Guide</p>
        <button className="nav-toggle" onClick={onToggle} title={isOpen ? 'Hide menu' : 'Show menu'}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <ul className="nav-menu">
        <li>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <FiHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/mentor" 
            className={`nav-link ${isActive('/mentor') ? 'active' : ''}`}
          >
            <FiMessageSquare /> AI Mentor
          </Link>
        </li>
        <li>
          <Link 
            to="/jobs" 
            className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
          >
            <FiBriefcase /> Job Matches
          </Link>
        </li>
        <li>
          <Link 
            to="/skills" 
            className={`nav-link ${isActive('/skills') ? 'active' : ''}`}
          >
            <FiTrendingUp /> Skills
          </Link>
        </li>
        <li>
          <Link 
            to="/learning" 
            className={`nav-link ${isActive('/learning') ? 'active' : ''}`}
          >
            <FiBook /> Learning Paths
          </Link>
        </li>
        <li>
          <Link 
            to="/analytics" 
            className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
          >
            <FiBarChart2 /> Analytics
          </Link>
        </li>
      </ul>

      <button className="nav-logout" onClick={handleLogout}>
        <FiLogOut /> Logout
      </button>
    </nav>
  );
}

export default Navigation;
