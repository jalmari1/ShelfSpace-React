import React from 'react';

const Login = () => {
    return (
        <>
            {/* Login Section */}
            <div className="book-details">
                <h2>Login</h2>
                <form action="#">
                    <input type="text" placeholder="Username" required />
                    <br />
                    <input type="password" placeholder="Password" required />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
