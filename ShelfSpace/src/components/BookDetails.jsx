import React from 'react';
import './BookDetails.css'; 

const BookDetails = () => {
    return (
        <div>
            {/* Banner */}
            <div className="banner">
                <div className="logo">Library Connect</div>
                <div>
                    <button className="signup-btn">Sign up</button>
                    <button className="login-btn">Login / My profile</button>
                </div>
            </div>

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

            {/* Book Details Section */}
            <div className="details-container">
                {/* Book Cover */}
                <div className="book-cover"></div>

                {/* Book Info */}
                <div className="book-info">
                    <h2>Book Title</h2>
                    <p><strong>Author:</strong> Author Name</p>
                    <p><strong>Year:</strong> 2024</p>
                    <p><strong>ISBN:</strong> 123-456-789</p>
                    <p><strong>Category:</strong> Fiction</p>
                    <p><strong>Rating:</strong> ★★★★☆ <small>(11 ratings)</small></p>
                    <button className="add-bookshelf-btn">Add to Bookshelf</button>
                </div>
            </div>

            {/* Summary and Reviews */}
            <div className="summary-reviews">
                {/* Summary Section */}
                <div className="summary-section">
                    <h3>Summary</h3>
                    <p>
                        This is a brief summary of the book content. It highlights the main plot and themes in the book.
                    </p>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <h3>Reviews</h3>
                    <p>Review content goes here...</p>
                    <button className="add-review-btn">Add Review</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
