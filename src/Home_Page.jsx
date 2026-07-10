import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Home_Page.css';
import Dashboard from './Dashboard';
import Profile from './Profile';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const HomePage = ({ onLogout }) => {
  const [minimized, setMinimized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [navItemSelected, setNavItemSelected] = useState('dashboard','profile', 'ai-analyzer', 'test-quiz', 'personalize');

  const location = useLocation();
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : '';
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`dashboard-root ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar with Router Links */}
      <aside className={`sidebar ${minimized ? 'minimized' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon"><i className="fas fa-graduation-cap"></i></div>
          <span className={`brand-text ${minimized ? 'hidden' : ''}`}>
            JEE<span>Math</span>
          </span>
        </div>
        <nav className="sidebar-nav">
          {/* Use Link and active class based on location */}
          <div
            className={`nav-item ${navItemSelected === 'dashboard' ? 'active' : ''}`}
            onClick={() => setNavItemSelected('dashboard')}
          >
            <i className="fas fa-th-large nav-icon"></i>
            <span className={`nav-text ${minimized ? "hidden" : ""}`}>
              Dashboard
            </span>
          </div>
          <div
            className={`nav-item ${navItemSelected === 'profile' ? 'active' : ''}`} 
            onClick={() => setNavItemSelected('profile')}
          >
            <i className="fas fa-user nav-icon"></i>
            <span className={`nav-text ${minimized ? 'hidden' : ''}`}>Profile</span>
          </div>
          {/* Placeholder links (no routing yet) */}
          <a className="nav-item">
            <i className="fas fa-robot nav-icon"></i>
            <span className={`nav-text ${minimized ? 'hidden' : ''}`}>AI Analyzer</span>
          </a>
          <a className="nav-item">
            <i className="fas fa-clipboard-question nav-icon"></i>
            <span className={`nav-text ${minimized ? 'hidden' : ''}`}>Test / Quiz</span>
          </a>
          <a className="nav-item">
            <i className="fas fa-sliders-h nav-icon"></i>
            <span className={`nav-text ${minimized ? 'hidden' : ''}`}>Personalize</span>
          </a>
        </nav>
      </aside>

      {/* Main */}
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setMinimized(!minimized)}>
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="page-title">Dashboard</h2>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button className="icon-btn notification">
              <i className="fas fa-bell"></i>
              <span className="dot"></span>
            </button>
            <div className="avatar-wrapper" ref={avatarRef}>
              <button
                type="button"
                className="avatar-btn"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
              >
                <div className="avatar">RK</div>
              </button>
              {menuOpen && (
                <div className="avatar-menu">
                  <Link to="/profile" className="avatar-menu-item" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button type="button" className="avatar-menu-item danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
            <span className={`username ${minimized ? 'hidden' : ''}`}>Rohan K.</span>
          </div>
        </header>

        {navItemSelected === "dashboard" && <Dashboard />}
        {navItemSelected === "profile" && <Profile />}

      </div>
    </div>
  );
};

export default HomePage;
