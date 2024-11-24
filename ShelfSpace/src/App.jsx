import React from 'react'
import {Routes, Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import BookDetails from './components/BookDetails'

function App() {

  return (
    <Router>
      <div className='App'>
        <Header />
        <SearchBar />
        <SearchResults />
      </div>
      <Routes>
        <Route path="details" element={<BookDetails />} />
      </Routes>
    </Router>
  )
}

export default App
