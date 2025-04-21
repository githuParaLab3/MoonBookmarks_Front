import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark } from '../types/bookmark';
import { Colecao } from '../types/colecao';


const fetchBookmarks = async (): Promise<Bookmark[]> => {
  const response = await axios.get('https://moonbookmarks-back.onrender.com/bookmarks');
  return response.data;
};


const fetchBookmarksByUsuario = async (usuarioId: string): Promise<Bookmark[]> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/usuario/${usuarioId}`);
  return response.data;
};


const fetchBookmarkById = async (id: string): Promise<Bookmark> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
  return response.data;
};


const addBookmark = async (novoBookmark: Omit<Bookmark, 'id'>): Promise<Bookmark> => {
  const response = await axios.post('https://moonbookmarks-back.onrender.com/bookmarks', novoBookmark);
  return response.data;
};


const updateBookmark = async (id: string, bookmarkAtualizado: Partial<Bookmark>): Promise<Bookmark> => {
  const response = await axios.put(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`, bookmarkAtualizado);
  return response.data;
};


const deleteBookmark = async (id: string): Promise<void> => {
  await axios.delete(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
};


const addColecaoToBookmark = async (bookmarkId: string, colecaoId: string): Promise<Bookmark> => {
  const response = await axios.post(
    `https://moonbookmarks-back.onrender.com/bookmarks/${bookmarkId}/colecoes/${colecaoId}`
  );
  return response.data;
};


const removeColecaoFromBookmark = async (bookmarkId: string, colecaoId: string): Promise<Bookmark> => {
  const response = await axios.delete(
    `https://moonbookmarks-back.onrender.com/bookmarks/${bookmarkId}/colecoes/${colecaoId}`
  );
  return response.data;
};


const fetchColecoesByBookmark = async (bookmarkId: string): Promise<Colecao[]> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${bookmarkId}/colecoes`);
  return response.data;
};

export const useBookmarks = () => {
  return useQuery<Bookmark[], Error>({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
  });
};


export const useBookmarksByUsuario = (usuarioId: string) => {
  return useQuery<Bookmark[], Error>({
    queryKey: ['bookmarks', usuarioId],
    queryFn: () => fetchBookmarksByUsuario(usuarioId),
    enabled: !!usuarioId, 
  });
};


export const useBookmarkById = (id: string) => {
  return useQuery<Bookmark, Error>({
    queryKey: ['bookmark', id],
    queryFn: () => fetchBookmarkById(id),
    enabled: !!id, 
  });
};


export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, Omit<Bookmark, 'id'>>({
    mutationFn: addBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};


export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, { id: string; bookmarkAtualizado: Partial<Bookmark> }>({
    mutationFn: ({ id, bookmarkAtualizado }) => updateBookmark(id, bookmarkAtualizado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};


export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};


export const useAddColecaoToBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, { bookmarkId: string; colecaoId: string }>({
    mutationFn: ({ bookmarkId, colecaoId }) => addColecaoToBookmark(bookmarkId, colecaoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};


export const useRemoveColecaoFromBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, { bookmarkId: string; colecaoId: string }>({
    mutationFn: ({ bookmarkId, colecaoId }) => removeColecaoFromBookmark(bookmarkId, colecaoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};


export const useColecoesByBookmark = (bookmarkId: string) => {
  return useQuery<Colecao[], Error>({
    queryKey: ['colecoes', bookmarkId],
    queryFn: () => fetchColecoesByBookmark(bookmarkId),
    enabled: !!bookmarkId, 
  });
};
