import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://e-commerce-5-48ed.onrender.com/api/auth/login', loginData);

      setUser(res.data.user);

      // After login, check if there was a "buy now" intent
      const productId = localStorage.getItem("buy_intent_product_id");
      if (productId) {
        localStorage.removeItem("buy_intent_product_id");
        navigate(`/product/${productId}`);  // Redirect to the product page
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div style={styles.loginCard}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  loginCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '340px',
    margin: '2rem auto',
    fontFamily: 'sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '24px',
    fontWeight: '600',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '1rem'
  }
};

export default Login;
