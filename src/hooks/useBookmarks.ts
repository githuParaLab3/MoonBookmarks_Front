// src/hooks/useBookmarks.ts
import { useQuery, useMutation, useQueryClient, } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark } from '../types/bookmark';

// Função para obter todos os bookmarks
const fetchBookmarks = async (): Promise<Bookmark[]> => {
  const response = await axios.get('https://moonbookmarks-back.onrender.com/bookmarks');
  return response.data;
};

// Função para obter os bookmarks por usuarioId
const fetchBookmarksByUsuario = async (usuarioId: string): Promise<Bookmark[]> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/usuario/${usuarioId}`);
  return response.data;
};

// Função para obter um bookmark por ID
const fetchBookmarkById = async (id: number): Promise<Bookmark> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
  return response.data;
};

// Função para criar um novo bookmark
const addBookmark = async (novoBookmark: Omit<Bookmark, 'id'>): Promise<Bookmark> => {
  const response = await axios.post('https://moonbookmarks-back.onrender.com/bookmarks', novoBookmark);
  return response.data;
};

// Função para atualizar um bookmark
const updateBookmark = async (id: number, bookmarkAtualizado: Partial<Bookmark>): Promise<Bookmark> => {
  const response = await axios.put(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`, bookmarkAtualizado);
  return response.data;
};

// Função para excluir um bookmark
const deleteBookmark = async (id: number): Promise<void> => {
  await axios.delete(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
};

// Hook para obter todos os bookmarks
export const useBookmarks = () => {
  return useQuery<Bookmark[], Error>({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
  });
};

// Hook para obter os bookmarks de um usuário específico
export const useBookmarksByUsuario = (usuarioId: string) => {
  return useQuery<Bookmark[], Error>({
    queryKey: ['bookmarks', usuarioId],
    queryFn: () => fetchBookmarksByUsuario(usuarioId),
    enabled: !!usuarioId, // Só ativa a query quando o usuarioId for válido
  });
};

// Hook para obter um bookmark por ID
export const useBookmarkById = (id: number) => {
  return useQuery<Bookmark, Error>({
    queryKey: ['bookmark', id],
    queryFn: () => fetchBookmarkById(id),
    enabled: !!id, // Só ativa a query quando o id for válido
  });
};

// Hook para criar um novo bookmark
export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, Omit<Bookmark, 'id'>>({
    mutationFn: addBookmark,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};

// Hook para atualizar um bookmark
export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, { id: number; bookmarkAtualizado: Partial<Bookmark> }>({
    mutationFn: ({ id, bookmarkAtualizado }) => updateBookmark(id, bookmarkAtualizado),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};

// Hook para excluir um bookmark
export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteBookmark,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
