import {React, useEffect, useState} from 'react';
import './BookDetails.css';
import { useLocation } from "react-router-dom";
import axios from 'axios'

const BookDetails = () => {
    const location = useLocation();
    const bookInformation = location.state?.book; // Get book details from location state

    const [summary, setSummary] = useState("Loading summary...");

    const imgUrl = `https://covers.openlibrary.org/b/olid/${bookInformation.cover_edition_key}-M.jpg`;

    const getBookSummary = async () => {
        if (!bookInformation?.key) {
            setSummary("No summary available.");
            return;
        }
        const getBookSummaryUrl = `http://openlibrary.org${bookInformation.key}.json`;
        try{
            const response = await axios.get(getBookSummaryUrl);
            const summary = response.data.description?.value || response.data.description || "No summary available.";
            setSummary(summary);
        }catch(err){
            console.log('Error fetching book summary:',err);
            setSummary("Failed to load summary. Please try again later.");
        }
    }

    useEffect(() => {
        getBookSummary();
        console.log(summary);
    },[bookInformation]);

    if (!bookInformation) {
        return <div>No book details available.</div>;
    }

    return (
        <>
        
        <h2 className="text">Book details:</h2>
        <div className="details-container">
           
            {/* Left Column: Book Cover */}
            <div className="book-cover">
            
                <img
                    src={imgUrl}
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
                            {summary}
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
