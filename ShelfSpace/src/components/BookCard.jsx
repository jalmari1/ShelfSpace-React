import React from 'react'
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const BookCard = ({book}) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='result-card' onClick={() => {
                navigate("/details")
            }}>
                <div className='cover'></div>
                <div className='title'>{book.title}</div>
                <div className="author">{book.author_name}</div>
                <div className="year">{book.first_publish_year}</div>
            </div>
        </>
    );
}

export default BookCard;