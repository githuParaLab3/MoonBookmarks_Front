import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark } from '../types/bookmark';
import { Colecao } from '../types/colecao';

// Função para obter todos os bookmarks
const fetchBookmarks = async (): Promise<Bookmark[]> => {
  const response = await axios.get('https://moonbookmarks-back.onrender.com/bookmarks');
  return response.data;
};

// Função para obter os bookmarks por usuarioId
const fetchBookmarksByUsuario = async (usuarioId: string): Promise<Bookmark[]> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/usuario/${usuarioId}`);
  return response.data;
};

// Função para obter um bookmark por ID
const fetchBookmarkById = async (id: string): Promise<Bookmark> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
  return response.data;
};

// Função para criar um novo bookmark
const addBookmark = async (novoBookmark: Omit<Bookmark, 'id'>): Promise<Bookmark> => {
  const response = await axios.post('https://moonbookmarks-back.onrender.com/bookmarks', novoBookmark);
  return response.data;
};

// Função para atualizar um bookmark
const updateBookmark = async (id: string, bookmarkAtualizado: Partial<Bookmark>): Promise<Bookmark> => {
  const response = await axios.put(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`, bookmarkAtualizado);
  return response.data;
};

// Função para excluir um bookmark
const deleteBookmark = async (id: string): Promise<void> => {
  await axios.delete(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
};

// Função para adicionar uma coleção ao bookmark
const addColecaoToBookmark = async (bookmarkId: string, colecaoId: string): Promise<Bookmark> => {
  const response = await axios.post(
    `https://moonbookmarks-back.onrender.com/bookmarks/${bookmarkId}/colecoes/${colecaoId}`
  );
  return response.data;
};

// Função para remover uma coleção do bookmark
const removeColecaoFromBookmark = async (bookmarkId: string, colecaoId: string): Promise<Bookmark> => {
  const response = await axios.delete(
    `https://moonbookmarks-back.onrender.com/bookmarks/${bookmarkId}/colecoes/${colecaoId}`
  );
  return response.data;
};

// Função para obter as coleções de um bookmark
const fetchColecoesByBookmark = async (bookmarkId: string): Promise<Colecao[]> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${bookmarkId}/colecoes`);
  return response.data;
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
export const useBookmarkById = (id: string) => {
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

  return useMutation<Bookmark, Error, { id: string; bookmarkAtualizado: Partial<Bookmark> }>({
    mutationFn: ({ id, bookmarkAtualizado }) => updateBookmark(id, bookmarkAtualizado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};

// Hook para excluir um bookmark
export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};

// Hook para adicionar uma coleção ao bookmark
export const useAddColecaoToBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, { bookmarkId: string; colecaoId: string }>({
    mutationFn: ({ bookmarkId, colecaoId }) => addColecaoToBookmark(bookmarkId, colecaoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};

// Hook para remover uma coleção do bookmark
export const useRemoveColecaoFromBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, { bookmarkId: string; colecaoId: string }>({
    mutationFn: ({ bookmarkId, colecaoId }) => removeColecaoFromBookmark(bookmarkId, colecaoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};

// Hook para listar as coleções de um bookmark
export const useColecoesByBookmark = (bookmarkId: string) => {
  return useQuery<Colecao[], Error>({
    queryKey: ['colecoes', bookmarkId],
    queryFn: () => fetchColecoesByBookmark(bookmarkId),
    enabled: !!bookmarkId, // Só ativa a query quando o bookmarkId for válido
  });
};
