import React from 'react'
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const BookCard = ({book}) => {
    const navigate = useNavigate();
    const imgUrl = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-S.jpg`
    : "path/to/default-image.jpg";
    return (
        <>
            <div className='result-card' onClick={() => {
                navigate("/details", {state: {book}});
            }}>
                <div className='cover'><img src={imgUrl} alt={book.title} /></div>
                <div className='title'>{book.title}</div>
                <div className="author">{book.author_name}</div>
                <div className="year">{book.first_publish_year}</div>
            </div>
        </>
    );
}

export default BookCard;