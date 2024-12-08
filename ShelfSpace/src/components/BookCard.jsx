import React from 'react'
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const BookCard = ({book, source = undefined, onRemove}) => {
    // console.log(book);
    const navigate = useNavigate();
    const imgUrl = book?.cover_edition_key && book.cover_edition_key.trim()
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : "../../default book cover image.jpg";
    const token = localStorage.getItem('authToken'); // Retrieve token from storage

    console.log("Source prop:", source);

    // Destructure source if it's provided
 //   const user = source?.user;
    const shelfName = source?.shelfName;

    const removeBook = async ({isbn}) => {
               console.log("removeBook called with parameters:", { shelfName, isbn });
    
            if (!shelfName) {
                console.error("Missing shelfName for removeBook.");
                return;
            }
    
            try {
                const response = await fetch(`${import.meta.env.VITE_BE_URL}/bookshelf/removebook`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ shelfname: shelfName, isbn: isbn }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Book removed:", data.message);
    
                    // Optionally call an onRemove callback to update the parent component
                    if (onRemove) {
                        onRemove(isbn);
                    }
                } else {
                    const errorData = await response.json();
                    console.error("Failed to remove book:", errorData.error);
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error("Error removing book:", error);
                alert("An error occurred while removing the book.");
            }
    
           }
       
           

    return (
        <>
            <div className='result-card' onClick={() => {
                navigate("/details", {state: {book}});
            }}>
                <div className='cover'><img src={imgUrl} alt={book.title} /></div>
                <div className='title'>{book.title}</div>
                <div className="author">{book.author_name}</div>
                <div className="year">{book.first_publish_year}</div>
                {source != undefined && (
                    <button 
                        className="action-button"
                        onClick={(e) => {
                            console.log(`Button clicked for book: ${book.isbn[0]}`);
                            e.stopPropagation(); // Prevent triggering the navigation to details
                            removeBook({ isbn: book.isbn[0] });
                        }}
                        
                    >Remove from Shelf</button>
                )}
            </div>
        </>
    );
}

export default BookCard;