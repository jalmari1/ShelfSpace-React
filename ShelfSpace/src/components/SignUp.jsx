import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Signup.css';


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // To display success or error messages
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const registerUrl = `${import.meta.env.VITE_BE_URL}`+"/register";
    try {
      const response = await axios.post(registerUrl, formData);
      setMessage(response.data.message); // Display success message
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "An error occurred during registration.";
      setMessage(errorMsg); // Display error message
    }
  };

  return (
    <div className="book-details">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <p style={{ fontSize: "14 px", marginTop: "10px" }}>Already Registered? <b> <a onClick={() => navigate("/Login")}>Login </a></b> instead
        </p>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>} {/* Display feedback */}
    </div>
  );
};

export default SignUp;
