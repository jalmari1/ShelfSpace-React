import React from 'react';

const SearchBar = () => {
    return(
        <div className='search-bar'>
            <input type="text" placeholder="Search by keyword" />
            <select>
                <option value="isbn">ISBN</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="category">Category</option>
            </select>
            <button>Search</button>
        </div>
    );
}

export default SearchBar;