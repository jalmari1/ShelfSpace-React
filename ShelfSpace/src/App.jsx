import { React, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyBookshelf from './components/MyBookshelf';
import BookCard from './components/BookCard';
import Banner from './components/Banner';
import Loader from './components/Loader';


function App() {
  const [searchCategory, setSearchCategory] = useState('isbn');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // State for error messages
  const [bestSellingBooks, setBestSellingBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks user login state

  const fetchBestSellingBooks = async () => {
    setLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const listQuery = 'Combined Print and E-Book Fiction';

    let bestSellingBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/${formattedDate}/${listQuery}.json`;
    let bookMap = {};
    try {
      const response = await axios.get(bestSellingBooksUrl, {
        params: {
          'api-key': `${import.meta.env.VITE_API_KEY}`,
        },
      });
      const bestSellerList = response.data.results;
      for (let i = 0; i < bestSellerList.books.length; i++) {
        const firstIsbn = bestSellerList.books[i].primary_isbn10;
        const bookData = await fetchBookData(firstIsbn);
        if (bookData) {
          bookMap[firstIsbn] = bookData;
        }
      }
      setBestSellingBooks(bookMap);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookData = async (isbn) => {
    const getBookDataUrl = `/search/isbn/${isbn}`;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE_URL + getBookDataUrl}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for ISBN: ${isbn}`, error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchBestSellingBooks();

    // Check if the user is already logged in (e.g., via a token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </nav>

        {/* Display the SearchBar globally */}
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          results={results}
          setResults={setResults}
          error={error}
          setError={setError}
        />

        <Routes>
          <Route
            path="/"
            element={
              <div className="Search-container">
                <div className="banner">
                  <Banner />
                </div>
                <div className="results-grid">
                  {/* <Loader/> */}
                {loading ? (
                  <Loader />
                ): (
                  Object.keys(bestSellingBooks).map((firstIsbn) => {
                      const books = bestSellingBooks[firstIsbn];
                      return books
                        .filter((result) => result.author_name !== 'TBD' && result.title !== 'Untitled')
                        .map((result, index) => {
                          return <BookCard key={index} book={result} />;
                        });
                    })
                )}
                </div>
              </div>
            }
          />
          <Route path="/results" element={<SearchResults results={results} />} />
          <Route path="/details" element={<BookDetails />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/SignUp" element={<SignUp />} />
          
          <Route
            path="/bookshelf"
            element={<MyBookshelf results={results} setResults={setResults} loading={loading} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
