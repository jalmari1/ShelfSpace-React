import React from 'react';
import './BookDetails.css';
import { useLocation } from "react-router-dom";

const BookDetails = () => {
    const location = useLocation();
    const bookInformation = location.state?.book; // Get book details from location state
    // console.log(bookInformation);
    if (!bookInformation) {
        return <div>No book details available!</div>;
    }

    return (
        <div>
            {/* Book Details Section */}
            <div className="details-container">
                {/* Book Cover */}
                <div className="book-cover"></div>

                {/* Book Info */}
                <div className="book-info">
                    <h2>{bookInformation.title}</h2>
                    <p><strong>Author:</strong> {bookInformation.author_name}</p>
                    <p><strong>Year:</strong> {bookInformation.first_publish_year}</p>
                    <p><strong>ISBN:</strong> {bookInformation.isbn}</p>
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
