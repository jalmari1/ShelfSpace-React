import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({searchCategory, setSearchCategory, searchValue, setSearchValue, results, setResults, error, setError}) => {
    const navigate = useNavigate();
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
        console.log(results);
        navigate("/results");
    }

    return(
        <div className='search-bar'>
            <input type="text" placeholder="Search by keyword" onChange={handleChange} required/>
            <select value={searchCategory} onChange={handleCategoryChange}>
                <option value="isbn">ISBN</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;