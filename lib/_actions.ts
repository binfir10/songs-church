'use server'
import { NextApiRequest } from "next";
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

export async function deleteSong(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/song/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
      return { success: true };
    }
  } catch (error:any) {
    console.error('Error deleting Song:', error);
   return { success: false, error: error.message };
  }
}

