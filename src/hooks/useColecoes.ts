import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Colecao } from '../types/colecao';  
import { Bookmark } from '../types/bookmark';  

// URL base do seu backend
const API_URL = 'https://moonbookmarks-back.onrender.com/colecoes';


const fetchColecoes = async (): Promise<Colecao[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};


const fetchColecaoById = async (id: string): Promise<Colecao> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


const addColecao = async (novaColecao: Omit<Colecao, 'id'>): Promise<Colecao> => {
  const response = await axios.post(API_URL, novaColecao);
  return response.data;
};


const updateColecao = async (colecao: Colecao): Promise<Colecao> => {
  const response = await axios.put(`${API_URL}/${colecao.id}`, colecao);
  return response.data;
};


const deleteColecao = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};


const addBookmarkToColecao = async (colecaoId: string, bookmarkId: string): Promise<Colecao> => {
  const response = await axios.post(
    `${API_URL}/${colecaoId}/bookmarks/${bookmarkId}`
  );
  return response.data;
};


const removeBookmarkFromColecao = async (colecaoId: string, bookmarkId: string): Promise<Colecao> => {
  const response = await axios.delete(
    `${API_URL}/${colecaoId}/bookmarks/${bookmarkId}`
  );
  return response.data;
};


const fetchBookmarksByColecao = async (colecaoId: string): Promise<Bookmark[]> => {
  const response = await axios.get(`${API_URL}/${colecaoId}/bookmarks`);
  return response.data;
};


export const useColecoes = () => {
  return useQuery<Colecao[], Error>({
    queryKey: ['colecoes'],
    queryFn: fetchColecoes,
  });
};


export const useColecaoById = (id: string) => {
  return useQuery<Colecao, Error>({
    queryKey: ['colecao', id],
    queryFn: () => fetchColecaoById(id),
    enabled: !!id,  
  });
};


export const useCreateColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, Omit<Colecao, 'id'>>({
    mutationFn: addColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};


export const useUpdateColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, Colecao>({
    mutationFn: updateColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};


export const useDeleteColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};


export const useAddBookmarkToColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, { colecaoId: string; bookmarkId: string }>({
    mutationFn: ({ colecaoId, bookmarkId }) => addBookmarkToColecao(colecaoId, bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};


export const useRemoveBookmarkFromColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, { colecaoId: string; bookmarkId: string }>({
    mutationFn: ({ colecaoId, bookmarkId }) => removeBookmarkFromColecao(colecaoId, bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};


export const useBookmarksByColecao = (colecaoId: string) => {
  return useQuery<Bookmark[], Error>({
    queryKey: ['bookmarks', colecaoId],
    queryFn: () => fetchBookmarksByColecao(colecaoId),
    enabled: !!colecaoId, 
  });
};
