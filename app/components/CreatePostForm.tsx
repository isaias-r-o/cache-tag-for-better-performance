'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost } from '../actions/posts';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Criando...' : 'Criar Post'}
    </button>
  );
}

export default function CreatePostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    try {
      await createPost(formData);
      formRef.current?.reset();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar post');
    }
  }

  return (
    <form ref={formRef} action={handleAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Conteúdo
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
} 