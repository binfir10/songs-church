/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './EditorToolbar';
import Heading from '@tiptap/extension-heading';
import { useEffect, useState } from 'react';
export const revalidate = 0
const Tiptap = ({ value, onChange }: { value: string, onChange: (richText: string) => void }) => {
  const[editorReady, setEditorReady] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
     
    ],
    content: editorReady ? value : '',
    editorProps: {
      attributes: {
        class: 'border border-input bg-transparent rounded-b-md border-t-0 p-2 w-full text-foreground h-[500px] max-h-[500px] overflow-auto',
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    setEditorReady(true);
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div className='w-full '>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className='' />
    </div>
  );
};

export default Tiptap;
