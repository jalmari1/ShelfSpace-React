import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/forgot-password`, { email });
      setMessage(response.data.message || 'A verification link has been sent to your email.');
      setMessageType('success');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="book-details">
      <h2>Reset Password</h2>
      {message && <p className={messageType === 'error' ? 'error-message' : 'success-message'}>{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send Reset Link</button>
      </form>
      <p style={{ fontSize: "14px", marginTop: "10px" }}>
        Remembered your password? <b onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>Login here</b>
      </p>
    </div>
  );
};

export default ForgotPassword;
