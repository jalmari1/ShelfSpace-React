import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/SignUp';

  return (
    <header className='banner'>
      {/* Logo with navigation to home */}
      <div className='logo' onClick={() => navigate('/')}>
        <img src="/ShelfSpaceLogo-S.png" alt="ShelfSpace Logo" />
      </div>
      
      {/* Auth buttons */}
      <div className='auth-buttons'>
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/bookshelf")}>My Bookshelf</button>
            <button onClick={onLogout}>Sign Out</button>
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
