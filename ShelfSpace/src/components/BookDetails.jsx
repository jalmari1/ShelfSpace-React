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
        <div className="details-container">
            {/* Left Section: Book Cover */}
            <div className="left-column">
                <div
                    className="book-cover"
                    style={{
                        backgroundImage: `url('https://ia903200.us.archive.org/view_archive.php?archive=/23/items/m_covers_0009/m_covers_0009_13.zip&file=0009139229-M.jpg')`,
                    }}
                ></div>
            </div>

            {/* Right Section: Details, Summary, Reviews */}
            <div className="right-column">
                {/* Book Info */}
                <div className="book-info">
                    <h2>{bookInformation.title}</h2>
                    <p><strong>Author:</strong> {bookInformation.author_name}</p>
                    <p><strong>Year:</strong> {bookInformation.first_publish_year}</p>
                    <p><strong>Category:</strong> Fiction</p>
                    <p><strong>Rating:</strong> ★★★★☆ <small>(11 ratings)</small></p>
                    <button className="add-bookshelf-btn">Add to Bookshelf</button>
                </div>

                {/* Summary Section */}
                <div className="summary-section">
                    <h3>Summary</h3>
                    <p>This is a brief summary of the book content. It highlights the main plot and themes in the book.</p>
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
