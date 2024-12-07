import { React, useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
import SignUp from './components/SignUp'; // Import SignUp Component
import MyBookshelf from './components/MyBookshelf';
import BookCard from './components/BookCard';
import Banner from './components/Banner'

function App() {
  const [searchCategory, setSearchCategory] = useState("isbn");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // State for error messages
  const [bestSellingBooks, setBestSellingBooks] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchBestSellingBooks = async () => {
    setLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0'); // Day of the month
    
    const formattedDate = `${year}-${month}-${day}`;
    const listQuery = 'Combined Print and E-Book Fiction';

    let bestSellingBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/${formattedDate}/${listQuery}.json`;
    let bookMap = {};
    try{
        const response = await axios.get(bestSellingBooksUrl, {
          params: {
            "api-key": `${import.meta.env.VITE_API_KEY}`,
          },
        });
        const bestSellerList = response.data.results;
        for(let i=0;i < bestSellerList.books.length; i++){
          const firstIsbn = bestSellerList.books[i].primary_isbn10;
          const bookData = await fetchBookData(firstIsbn);
          if (bookData){
            bookMap[firstIsbn]=bookData;
            // console.log(bookData);
          }
        }
        setBestSellingBooks(bookMap);
    }catch(error){
        console.error("Error fetching search results:", error);
    }
    finally{
      setLoading(false);
    }
  }

  const fetchBookData = async(isbn) => {
    const getBookDataUrl = `/search/isbn/${isbn}`
        try {
            const response = await axios.get(`${import.meta.env.VITE_BE_URL + getBookDataUrl}`);
            return response.data; // Assuming the API returns JSON data
        } catch (error) {
            console.error(`Error fetching data for ISBN: ${isbn}`, error.message);
            return null; // Return null for failed requests
        }
  }

  useEffect(() => {
    fetchBestSellingBooks();
  },[]);

  return (
    <Router>
      <div className="App">
        <nav>
          <Header />
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="Search-container">
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
            <div className='banner'>
              <Banner />
            </div>

              <div className="results-grid">
                {Object.keys(bestSellingBooks).map((firstIsbn) => {
                  const books = bestSellingBooks[firstIsbn];
                  return books
                    .filter((result) => result.author_name !== "TBD" && result.title !== "Untitled")
                    .map((result, index) => {
                      return <BookCard key={index} book={result} />
                  })
                })
                }
              </div>
              
            </div>
          }
        />
        <Route
          path="/results"
          element={
            <div className="Search-container">
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
              <SearchResults results={results} />
            </div>
          }
        />
        <Route
          path="/details"
          element={
            <div>
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
              <BookDetails />
            </div>
          }
        />
        <Route
          path="/Login"
          element={
            <div>
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
              <Login />
            </div>
          }
        />
        <Route
          path="/SignUp"
          element={
            <div>
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
              <SignUp />
            </div>
          }
        />
        <Route
          path="/bookshelf"
          element={
            <div>
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
              <MyBookshelf results={results} setResults={setResults} loading={loading}/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
