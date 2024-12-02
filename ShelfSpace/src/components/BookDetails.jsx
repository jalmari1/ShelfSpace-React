import React from 'react';
import './BookDetails.css';
import { useLocation } from "react-router-dom";

const BookDetails = () => {
    const location = useLocation();
    const bookInformation = location.state?.book; // Get book details from location state

    if (!bookInformation) {
        return <div>No book details available!</div>;
    }

    return (
        <>
        
        <h2 className="text">Book details:</h2>
        <div className="details-container">
           
            {/* Left Column: Book Cover */}
            <div className="book-cover">
            
                <img
                    src="https://ia903200.us.archive.org/view_archive.php?archive=/23/items/m_covers_0009/m_covers_0009_13.zip&file=0009139229-M.jpg"
                    alt="Book Cover"
                    className="book-image"
                />
            </div>

            {/* Right Column: Book Details */}
            <div className="book-info">
                <h2>{bookInformation.title}</h2>
                <p><strong>Author:</strong> {bookInformation.author_name || "Unknown"}</p>
                <p><strong>Year:</strong> {bookInformation.first_publish_year || "N/A"}</p>
                <p><strong>ISBN:</strong> {bookInformation.isbn?.[0] || "N/A"}</p>
                <p><strong>Category:</strong> Fiction</p>
                <p><strong>Rating:</strong> ★★★★☆ <small>(11 ratings)</small></p>
                <button className="add-bookshelf-btn">Add to Bookshelf</button>

                {/* Summary and Reviews Section */}
                <div className="summary-reviews">
                    {/* Summary */}
                    <div className="summary-section">
                        <h3>Summary</h3>
                        <p>
                            This is a brief summary of the book content. It highlights the main plot and themes of the book.
                        </p>
                    </div>

                    {/* Reviews */}
                    <div className="reviews-section">
                        <h3>Reviews</h3>
                        <p>Review content goes here...</p>
                        <button className="add-review-btn">Add Review</button>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
};

export default BookDetails;
