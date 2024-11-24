import React from 'react'
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const BookCard = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='result-card' onClick={() => {
                navigate("/details")
            }}>
                <div className='cover'></div>
                <div className='title'>Book Title</div>
                <div className="author">Author Name</div>
                <div className="year">2024</div>
            </div>
        </>
    );
}

export default BookCard;