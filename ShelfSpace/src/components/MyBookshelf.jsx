import {React, useState, useEffect} from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import CreateBookshelfModal from './Modal/CreateBookshelfModal';

const MyBookshelf = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    let user = "user1";
    const getAllBookshelvesUrl = `/bookshelf/getallbooks?username=${user}`;
    let searchQuery = `${import.meta.env.VITE_BE_URL + getAllBookshelvesUrl}`;
    
    const fetchBookshelves = async () => {
        // if (!bookshelfName.trim()) {
        //     setError("Bookshelf name cannot be empty.");
        //     return;
        //   };
        try{
            const response = await axios.get(searchQuery);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setBookshelves(response.data);
            }
        } catch (err) {
            console.log("Error", err.message);
            setError("Failed to load bookshelves. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBookshelves();
    },[isOpen]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Create Bookshelf</button>
            <CreateBookshelfModal open={isOpen} onClose={() => setIsOpen(false)} onBookshelfCreated={fetchBookshelves} />

            <div className="bookshelf-section">
                {bookshelves.length === 0 ? (
                   <p>No bookshelves found. Add one to get started!</p>
                   ) : 
                   (
                    bookshelves.bookshelf.map((shelf, index) => (
                        <div key={index}>
                            {/* Bookshelf Name */}
                            <h2>{shelf.bookshelfName}</h2>
                            <div className="results-grid">
                                {shelf.books.length === 0 ? (
                                    <p>No books found on this bookshelf.</p>
                                ) : 
                                (
                                    shelf.books.map((book, bookIndex) => (
                                        <BookCard key={bookIndex} book={book} />
                                    ))
                                )} 
                        </div>
                    </div>)))}
            </div>
        </>
    );
};

export default MyBookshelf;
