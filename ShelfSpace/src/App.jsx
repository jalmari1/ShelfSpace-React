import { React, useState } from 'react';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
import SignUp from './components/SignUp'; // Import SignUp Component
import MyBookshelf from './components/MyBookshelf';

function App() {
  const [searchCategory, setSearchCategory] = useState("isbn");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // State for error messages

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
              <MyBookshelf results={results} setResults={setResults} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
