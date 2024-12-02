import {React, useState, useEffect} from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import CreateBookshelfModal from './Modal/CreateBookshelfModal';

const MyBookshelf = () => {
    const [bookshelves, setBookshelves] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    let user = "user1";
    const getAllBookshelvesUrl = `/bookshelf/getallbooks?username=${user}`;
    let searchQuery = `${import.meta.env.VITE_BE_URL + getAllBookshelvesUrl}`;
    
    useEffect(() => {
        const fetchBookshelves = async () => {
            try{
                const response = await axios.get(searchQuery);
                if (response.data.error) {
                    setError(response.data.error); // Set error if there's one in the response
                } else {
                    setBookshelves(response.data); // Set bookshelves data if no error
                }
            } catch (err) {
                console.log("Error", err.message);
                setError("Failed to load bookshelves. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookshelves();
    },[]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // const handleCreateBookshelf = async () => {
    //     const endpoint = '/bookshelf/newbookshelf'
    //     try{
    //         const url = `${import.meta.env.VITE_BE_URL + endpoint}`;
    //         const data = {
    //             username: 'testUser',
    //             shelfname: 'newBookShelf2'
    //         };

    //         const response = await axios.post(url,data);
    //         console.log('Response:', response.data);
    //     }catch(error){
    //         console.error('Error posting data:', error);
    //     }
    // };

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Create Bookshelf</button>
            <CreateBookshelfModal open={isOpen} onClose={() => setIsOpen(false)}>
            </CreateBookshelfModal>

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
                            {shelf.books.map((book, bookIndex) => (
                                <BookCard key={bookIndex} book={book} />
                            ))} 
                        </div>
                    </div>)))}
            </div>
        </>
    );
};

export default MyBookshelf;
