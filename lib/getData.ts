'use server'
import { tursoClient } from "./tursoClient";
import { Songs } from "./types";

export async function getSongById(id: string): Promise<Songs | null> {
  try {
    const res = await tursoClient().execute({
      sql: 'SELECT * FROM songs WHERE id = ?',
      args: [id],
    });

    if (res.rows.length) {
      const song = res.rows[0]
    return JSON.parse(JSON.stringify(song));
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllSongs(): Promise<{ songs: Songs[] }> {
  try {
    const res = await tursoClient().execute('select * from songs;');
    const plainSongs: Songs[] = res.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      author: row.author,
      man: row.man,
      woman: row.woman,
      tone: row.tone,
      lyrics: row.lyrics,
    }));

    return {
      songs: plainSongs,
    };
  } catch (error) {
    console.log(error);
    return {
      songs: [],
    };
  }
}

export async function DeleteSong(id: string) {
  try {
    const res = await fetch(`/api/song/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok)
      alert('Cancion eliminada con exito');
      // Optionally, you can refresh the page or update the state to remove the deleted framework from the UI
      window.location.reload(); // Simple way to refresh the page

    
  } catch (error) {
    console.error('Error deleting Song:', error);
    alert('Unexpected error occurred');
  }
}
