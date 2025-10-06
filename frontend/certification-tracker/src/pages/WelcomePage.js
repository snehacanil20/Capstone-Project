import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

const WelcomePage = () => {
  return (
    <div className="welcome-fullscreen">
      <div className="welcome-overlay">
        <h1 className="welcome-title">WELCOME</h1>
        <p className="welcome-subtitle">Track your certifications with ease and clarity</p>
        <p className="welcome-cta">Do You Wanna <strong>Join Us?</strong></p>
        <div className="welcome-buttons">
          <Link to="/register"><button>Register Now</button></Link>
          <Link to="/login"><button className="secondary-btn">Login Here</button></Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage