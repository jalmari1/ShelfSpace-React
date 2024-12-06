import {React, useEffect, useState} from 'react'
import styles from './style.module.css'
import axios from 'axios'

export default function AddToBookshelfModal({open, onClose, bookDetails }) {
  const [bookshelves, setBookshelves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Handles errors
  const [selectedShelves, setSelectedShelves] = useState([]);

  const user = 'user1';
  useEffect(() => {
    const fetchBookshelfData = async () => {
    const getAllBookshelvesUrl = `/bookshelf/getallbooks?username=${user}`;
    let searchQuery = `${import.meta.env.VITE_BE_URL + getAllBookshelvesUrl}`; 
      try {
        const response = await axios.get(searchQuery); // Replace with your API endpoint
        const bookshelfNames = response.data.bookshelf.map(shelf => shelf.bookshelfName);
        setBookshelves(bookshelfNames);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookshelfData();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (shelfName) => {
    setSelectedShelves((prevSelected) =>
      prevSelected.includes(shelfName)
        ? prevSelected.filter((name) => name !== shelfName) // Remove if already selected
        : [...prevSelected, shelfName] // Add if not selected
    );
  };


  const handleAddBookToBookshelf = async () => {
    const user = "user1"; // Replace with dynamic username if needed
    const apiUrl = `${import.meta.env.VITE_BE_URL}/bookshelf/addbook`; // Replace with your actual API endpoint
    const data = selectedShelves.map((shelfname) => (
      {
          username: user,
          shelfname,
          book: {
              title: bookDetails.title,
              author: bookDetails.author_name || "Unknown",
              isbn: bookDetails.isbn?.[0] || "N/A",
              publish_year: bookDetails.first_publish_year || "N/A",
          },
      }));

    let allSuccessful = true;

    for (const payload of data){
      try{
        const response = await axios.post(apiUrl,payload);
        if (response.status !== 200){
          allSuccessful = false;
        }
      }catch (error){
        allSuccessful = false;
        if (error.response) {
          if (error.response.status === 400){
            console.error("400 Error: Bad request. Please check the input data.");
            alert("Bad request. Please check your input data and try again.");
          }else {
            console.error(`Error adding book to bookshelf: ${error.response.status}`);
            alert("An error occurred while adding the book. Please try again later.");
          }
          break;
        }
      }

      if (allSuccessful) {
        alert("Book successfully added to selected bookshelves.");
      }else {
        alert("Some bookshelves were not updated. Please try again.");
      }
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
    <div className={styles.modal}>
        <h3 className={styles.title}>Add to Bookshelf</h3>
        <label htmlFor="bookshelf">Bookshelf Name:</label>
        {bookshelves.map((shelf, index) => (
            <div key={index}> 
              <input 
                type="checkbox" 
                value={shelf}
                checked={selectedShelves.includes(shelf)}
                onChange={() => handleCheckboxChange(shelf)}
                />
              <label htmlFor={shelf}>{shelf}</label>

            </div>
          ))}
        <div className={styles.buttonGroup}>
            <button className={styles.createButton} onClick={ () => {
                handleAddBookToBookshelf();
                onClose();
            }}>Add to Bookshelf</button>
            <button className={styles.cancelButton} onClick={onClose}>Close</button>

        </div>
    </div>
</div>
  )
}
