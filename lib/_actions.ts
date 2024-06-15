'use server'
import { tursoClient } from "./tursoClient";
import { Songs } from "./types";
import { Resend } from "resend"
import { render } from "@react-email/render"
import EmailTemplate from "@/components/EmailTemplate";


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


export const sendEmail = async (state: string, formData: FormData) => {
  const name = formData.get("name") as string
  const author = formData.get("author") as string
  const tone = formData.get("tone") as string
    const man = formData.get("man") as string
  const woman = formData.get("woman") as string
  const lyrics = formData.get("lyrics") as string
  try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const emailSender = process.env.EMAIL_SENDER_NAME!
    await resend.emails.send({
      from: "EPDLC <onboarding@resend.dev>",
      to: [emailSender],
      subject: `${state} de canción`, //asunto
      html: render(EmailTemplate({state, name, author, tone, man, woman, lyrics}))
    })
    return {
      error: null,
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      error: (error as Error).message,
      success: false
    }
  }
}