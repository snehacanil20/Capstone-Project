import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/theme.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Certification Tracker</div>
      <div className="nav-links">
        <Link to="/">Catalog</Link>
        {!user && <Link to="/register">Register</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && user.role === 'EMPLOYEE' && (
          <>
            <Link to="/my-goals">My Goals</Link>
            <Link to="/goals/new">New Goal</Link>
          </>
        )}
        {user?.role === 'APPROVER' && (
          <Link to="/approver-dashboard">Approvals</Link>
        )}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;