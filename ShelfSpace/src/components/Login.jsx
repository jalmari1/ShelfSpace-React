import React from 'react';

const Login = () => {
    return (
        <>
            {/* Search Bar */}
            <div className="search-bar">
                <div className="search-container">
                    <label>Search by</label>
                    <select>
                        <option value="isbn">ISBN</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="category">Category</option>
                    </select>
                    <input type="text" placeholder="Keyword" />
                    <button className="search-btn">Search</button>
                </div>
            </div>

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
