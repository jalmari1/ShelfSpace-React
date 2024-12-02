import React from 'react'

export default function AddToBookshelfModal({open, onClose}) {
    if (!open) return null
  return (
    <div>
        <button onClick={onClose}>Close Modal</button>
    </div>
  )
}
