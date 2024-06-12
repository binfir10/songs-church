'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './EditorToolbar';
import Heading from '@tiptap/extension-heading';
import { useEffect } from 'react';

const Tiptap = ({ value, onChange }: { value: string, onChange: (richText: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
        },
        levels: [2]
      })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'border border-input bg-transparent rounded-b-md border-t-0 p-2 w-full min-h-[300px] text-foreground',
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div className='w-full'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
