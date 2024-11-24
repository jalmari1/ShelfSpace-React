import React from 'react'
import BookCard from './BookCard'

const SearchResults = () => {
    return (
        <div className='results-grid'>
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    );
}

export default SearchResults;