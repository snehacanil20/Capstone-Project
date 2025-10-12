import { useState, useContext } from 'react';
import axios from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/theme.css';


const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      const token = res.data.token; 
      login(token);
      navigate('/catalog');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials or server error');
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
          <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px'}}>
          Not yet registered? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );

};

export default Login;