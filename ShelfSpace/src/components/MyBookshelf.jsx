import {React, useState, useEffect} from 'react';
import axios, { all } from 'axios';
import BookCard from './BookCard';
import CreateBookshelfModal from './Modal/CreateBookshelfModal';
import { useNavigate, useLocation } from "react-router-dom";

const MyBookshelf = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [bookResults, setBookResults] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
  
    const token = localStorage.getItem('authToken'); // Retrieve token from storage
    if (!token) {
     //   alert('Please log in first');
        navigate("/login");
        //window.location.href = '/login'; // Redirect to login page
        return;
    }
    const getAllBookshelvesUrl = `/bookshelf/getallbooks`;
    let searchQuery = `${import.meta.env.VITE_BE_URL + getAllBookshelvesUrl}`;
   
    const fetchBookshelves = async () => {
        try{
            const response = await axios.get(searchQuery, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token
                },
            });
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

    const fetchBookData = async (isbn) => {
        const getBookDataUrl = `/search/isbn/${isbn}`
        try {
            const response = await axios.get(`${import.meta.env.VITE_BE_URL + getBookDataUrl}`);
            return response.data; // Assuming the API returns JSON data
        } catch (error) {
            console.error(`Error fetching data for ISBN: ${isbn}`, error.message);
            return null; // Return null for failed requests
        }
    };

    const handleFetchBooks = async () => {
        setLoadingBooks(true);
        const updatedBookResults  = {};
        for (const shelf of bookshelves.bookshelf || []) {
            const books  = [];
            for (const book of shelf.books) {
                const isbn = book.isbn; // Get the ISBN value
                const bookData = await fetchBookData(isbn); // Fetch data for this ISBN
                if (bookData) {
                    books.push(bookData); // Add the result to the array
                }
            };
            updatedBookResults[shelf.bookshelfName] = books;
            // console.log(books);
        }
        setBookResults(updatedBookResults);
        console.log(updatedBookResults);
        setLoadingBooks(false);
    };


    const handleRemoveBook = async (isbn, shelfName) => {
        await fetchBookshelves(); // Refetch updated bookshelves
        await handleFetchBooks(); // Refetch updated books
        alert(`The book has been successfully removed.`);

    };

    useEffect(() => {
        fetchBookshelves();
    },[isOpen]);

    useEffect(() => {
        handleFetchBooks();
    },[bookshelves])
    if (loading) return <p>Loading...</p>;
    if (loadingBooks) return <p>Loading books...</p>;
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
                                {bookResults[shelf.bookshelfName]?.length === 0 ? (
                                    <p>No books found on this bookshelf.</p>
                                ) : 
                                (
                                    bookResults[shelf.bookshelfName]?.map((result,index) => {
                                        return <BookCard key={index} book={result[0]} source={{shelfName: shelf.bookshelfName }}
                                        onRemove={(isbn) => handleRemoveBook(isbn, shelf.bookshelfName)} // Pass callback

                                        />
})
                                )} 
                        </div>
                    </div>)))}
            </div>
        </>
    );
};

export default MyBookshelf;
