import React from 'react';

const Header = () => {
    return (
      <header className='banner'>
        <div className='logo'>Library Connect</div>
        <div className='auth-buttons'>
            <button>Login</button>
            <button>My Bookshelf</button>
        </div>
      </header>
    );
  };
  
export default Header;