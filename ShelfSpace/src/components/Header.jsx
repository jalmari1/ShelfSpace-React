import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/SignUp';
  const token = localStorage.getItem('authToken'); 
  if (token) {
      isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  return (
    <header className='banner'>
      <div className='logo'><img src="../../public/ShelfSpaceLogo-S.png" alt="ShelfSpace Logo" /></div>
      <div className='auth-buttons'>
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/bookshelf")}>My Bookshelf</button>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            {isAuthPage ? (
              <button onClick={() => navigate("/")}>Back</button>
            ) : (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/SignUp")}>Sign Up</button>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
