import React from 'react'
import { Link, Routes, Route } from "react-router-dom";
import BookDetails from './BookDetails';

const BookCard = () => {
    return (
        <>
            <Link to="details">
                <div className='result-card'>
                    <div className='cover'></div>
                    <div className='title'>Book Title</div>
                    <div className="author">Author Name</div>
                    <div className="year">2024</div>
                </div>
            </Link>
        </>
    );
}

export default BookCard;