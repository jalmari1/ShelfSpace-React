import React from 'react'
import styles from './style.module.css'

export default function CreateBookshelfModal({open, onClose}) {
    if(!open) return null

  return (
    <>
        <div className={styles.overlay}/>
        <div className={styles.modal}>
            CreateBookshelfModal
            <button onClick={onClose}>Close</button>            
        </div>
    </>
  )
}
