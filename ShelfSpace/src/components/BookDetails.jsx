import React from 'react'

const BookDetails = () => {
    return (
        <div className="book-details">
            <div className="cover"></div>
            <div id="details-container">
                <h2>Book Title</h2>
                <p><strong>Author:</strong> Author Name</p>
                <p><strong>Year:</strong> 2024</p>
                <p><strong>ISBN:</strong> 123-456-789</p>
                <p><strong>Category:</strong> Fiction</p>
                <p><strong>Description:</strong> This is a detailed description of the book, providing more context about the story, themes, and content.</p>
            </div>
        </div>
    );
}

export default BookDetails;