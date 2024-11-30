import {React, useState} from 'react'
import BookCard from './BookCard'

const SearchResults = ({results}) => {
    const [bookInformation, setBookInformation] = useState("");
    if (!results || !results.data || results.data.length === 0) {
        return <div>Loading...</div>; // or any other loading indicator/message
      }
    return (
        <div className='results-grid'>
            {results.data.map((result,index) => (
                <BookCard key={index} book={result} />
            ))}
        </div>
    );
}

export default SearchResults;