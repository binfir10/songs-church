'use client'
import React from 'react'

async function deleteSong(id: number) {
  try {
    const res = await fetch(`/api/delete-song?id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert('Cancion eliminada con exito');
      // Optionally, you can refresh the page or update the state to remove the deleted framework from the UI
      window.location.reload(); // Simple way to refresh the page
    }
  } catch (error) {
    console.error('Error deleting Song:', error);
    alert('Unexpected error occurred');
  }
}
interface DeleteButtonProps {
  songId: number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ songId }) => {
  return (
    <button
      onClick={() => deleteSong(songId)}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Delete
    </button>
  )
}
