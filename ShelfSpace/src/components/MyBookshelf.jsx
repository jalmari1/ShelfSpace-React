import React from 'react';
import BookCard from './BookCard';

const MyBookshelf = () => {
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

            {/* Bookshelf Section */}
            <div className="bookshelf-section">
                <h2>My Bookshelf</h2>
                <div className="results-grid">
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </div>
            </div>
        </>
    );
};

export default MyBookshelf;
