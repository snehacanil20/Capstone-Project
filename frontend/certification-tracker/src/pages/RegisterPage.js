import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/theme.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'EMPLOYEE'
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', formData);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="auth-card">
        <h2>Register Form</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleChange}
          />
          <div className="role-selection">
            <label className="role-label">Select Role:</label>
            <div className="role-row-horizontal">
              {['EMPLOYEE', 'MANAGER', 'APPROVER', 'ADMIN'].map(role => (
                <label key={role} className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                  />
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </label>
              ))}
            </div>
          </div>
          <button type="submit">Register</button>
          {error && <p className="error-text">{error}</p>}
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px'}}>
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
