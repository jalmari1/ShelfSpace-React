import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

    return (
      <header className='banner'>
        <div className='logo'>Library Connect</div>
        <div className='auth-buttons'>
            {location.pathname === '/' ? (
              <>
                <button onClick={() => {navigate("/login")}}>Login</button>
                <button onClick={() => {navigate("/bookshelf")}}>My Bookshelf</button>
              </>
            ) : (
              <>
                <button onClick={() => {navigate("/")}}>Back</button>
              </>

            )

            }

        </div>
      </header>
    );
  };
  
export default Header;