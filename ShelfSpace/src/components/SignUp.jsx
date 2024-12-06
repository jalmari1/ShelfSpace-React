import React from 'react';

const SignUp = () => {
  return (
    <>
      {/* Signup Section */}
      <div className="book-details">
        <h2>Sign Up</h2>
        <form action="#">
          <input type="text" placeholder="Username" required />
          <br />
          <input type="text" placeholder="FirstName" required />
          <br />
          <input type="text" placeholder="LastName" required />
          <br />
          <input type="email" placeholder="Email" required />
          <br />
          <input type="password" placeholder="Password" required />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
