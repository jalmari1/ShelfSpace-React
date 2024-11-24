import {React, useState, useEffect} from 'react'
import {Routes, Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import BookDetails from './components/BookDetails'
import Login from './components/Login'
import MyBookshelf from './components/MyBookshelf'

function App() {
  return (
    <Router>
      <div className='App'>
        <nav>
          <Header />
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<div className="Search-container"><SearchBar /><SearchResults /></div>}/>
        <Route path="/details" element={<BookDetails />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/bookshelf" element={<MyBookshelf />}/>
      </Routes>
    </Router>
  )
}

export default App
