import {React, useState} from 'react'
import styles from './style.module.css'
import axios from 'axios';
// import '../../App.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateBookshelfModal({open, onClose, onBookshelfCreated}) {
  const [bookshelfName, setBookshelfName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken'); // Retrieve token from storage
  if (!token) {
      navigate("/login");
      return;
  }

  const handleCreateBookshelf = async () => {
 //   let user = "user1";
    let requestURL = "/bookshelf/newbookshelf"
    let data = {
//      username: user,
      shelfname: bookshelfName 
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BE_URL + requestURL}`,
        data, {
          headers: {
              Authorization: `Bearer ${token}`, // Attach the token
          },
      });
      console.log('Bookshelf created:', response.data);
      alert(`Bookshelf "${bookshelfName}" created successfully!`);

      if(onBookshelfCreated){
        onBookshelfCreated();
      }
    }catch(err){
      console.log('Error creating bookshelf:',err);
    }
  }

  if(!open) return null

  return (
    <>
        <div className={styles.overlay} onClick={onClose}/>
        <div className={styles.modal}>
            <h3 className={styles.title}>Create New Bookshelf</h3>
            <div className={styles.formGroup}>
              <label htmlFor="bookshelfName" className={styles.label}>Name:</label>
              <input type="text" id='bookshelfName' placeholder='Enter Bookshelf Name' className={styles.input} onChange={(e) => setBookshelfName(e.target.value)} required/>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.createButton} onClick={() => {
                handleCreateBookshelf();
                onClose();
              }}>Create</button>
              <button className={styles.cancelButton} onClick={onClose}>Close</button>            
            </div>

        </div>
    </>
  )
}
