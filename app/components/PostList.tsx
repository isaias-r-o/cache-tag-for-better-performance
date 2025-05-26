'use client';

import { useOptimistic, useState } from 'react';
import { deletePost, updatePost } from '../actions/posts';
import { Post } from '../lib/db';
import Modal from './Modal';

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    initialPosts,
    (state, action: { type: 'update' | 'delete', post?: Post, id?: string }) => {
      if (action.type === 'update' && action.post) {
        return state.map(p => p.id === action.post?.id ? action.post : p);
      } else if (action.type === 'delete' && action.id) {
        return state.filter(p => p.id !== action.id);
      }
      return state;
    }
  );

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = (post: Post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleUpdatePost = async (formData: FormData) => {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // Otimistic update
    const optimisticPost = {
      ...selectedPost!,
      title,
      content,
      updatedAt: new Date().toISOString()
    };
    addOptimisticPost({ type: 'update', post: optimisticPost });
    
    setIsEditModalOpen(false);
    try {
      await updatePost(formData);
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      alert('Erro ao atualizar post');
    }
  };

  const handleDeletePost = async (formData: FormData) => {
    const id = formData.get('id') as string;
    
    // Otimistic update
    addOptimisticPost({ type: 'delete', id });
    
    setIsDeleteModalOpen(false);
    try {
      await deletePost(formData);
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post');
    }
  };

  return (
    <>
      <div className="space-y-4">
        {optimisticPosts.map((post) => (
          <article key={post.id} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <time>Criado em: {new Date(post.createdAt).toLocaleDateString()}</time>
              <time>Atualizado em: {new Date(post.updatedAt).toLocaleDateString()}</time>
            </div>
          </article>
        ))}
      </div>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Post"
      >
        {selectedPost && (
          <form action={handleUpdatePost} className="space-y-4">
            <input type="hidden" name="id" value={selectedPost.id} />
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                id="edit-title"
                name="title"
                defaultValue={selectedPost.title}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700">
                Conteúdo
              </label>
              <textarea
                id="edit-content"
                name="content"
                defaultValue={selectedPost.content}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        {selectedPost && (
          <div>
            <p className="mb-4">Tem certeza que deseja excluir o post "{selectedPost.title}"?</p>
            <form action={handleDeletePost} className="flex justify-end space-x-2">
              <input type="hidden" name="id" value={selectedPost.id} />
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Excluir
              </button>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
} 