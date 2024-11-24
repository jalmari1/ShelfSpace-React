import React from 'react'
import BookCard from './BookCard'

const MyBookshelf = () => {
    return (
        <div className="bookshelf-section">
            <h2>My Bookshelf</h2>
            <div className='results-grid'>
                <BookCard />
                <BookCard />
                <BookCard />
            </div>
      </div>
    )
}

export default MyBookshelf;