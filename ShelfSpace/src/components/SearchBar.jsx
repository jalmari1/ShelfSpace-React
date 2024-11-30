import {React, useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = ({searchCategory, setSearchCategory, searchValue, setSearchValue, results, setResults, error, setError}) => {
    let requestURL;

    const handleChange = (event) => {
        setSearchValue(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setSearchCategory(event.target.value);

      }

    const handleSearch = async () => {
        let searchQuery = encodeURIComponent(searchValue);
        switch(searchCategory){
            case "title":
                requestURL=`/search/title?title=${searchQuery}`;
                break;
            case "isbn":
                requestURL=`/search/isbn/${searchQuery}`;
                break;
            case "author":
                requestURL=`/search/author?author=${searchQuery}`;
        }

        try{
            const response = await axios.get(`${import.meta.env.VITE_BE_URL + requestURL}`);
            setResults(response);
            setError(null);
        }catch(err) {
            setError(err.response?.data?.error || 'Something went wrong');
            console.error(err);
        }
    }

    return(
        <div className='search-bar'>
            <input type="text" placeholder="Search by keyword" onChange={handleChange}/>
            <select value={searchCategory} onChange={handleCategoryChange}>
                <option value="isbn">ISBN</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="category">Category</option>
            </select>
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default SearchBar;