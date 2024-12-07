import axios from 'axios';
import {React, useState, useEffect} from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setError(''); // Clear any previous errors

    let requestURL='/login';

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL + requestURL}`, { username, password }); // Replace with your backend URL
      const token = response.data.token;

      if (token) {
        localStorage.setItem('authToken', token); // Store token in localStorage
        alert('Login successful!');
        // Redirect user or update app state
        window.location.href = '/bookshelf'; // Example: redirect to dashboard
      }
    } catch (err) {
      console.error(err);
      setError('Invalid username or password. Please try again.'); // Set error message
    }
  };

    return (
        <>
            {/* Login Section */}
            <div className="book-details">
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form action="#" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <br />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
