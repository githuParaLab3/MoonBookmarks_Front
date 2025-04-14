import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Colecao } from '../types/colecao';  // Ajuste conforme o local do tipo Colecao
import { Bookmark } from '../types/bookmark';  // Ajuste conforme o local do tipo Bookmark

// URL base do seu backend
const API_URL = 'https://moonbookmarks-back.onrender.com/colecoes';

// Função para obter todas as coleções
const fetchColecoes = async (): Promise<Colecao[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Função para obter uma colecao por ID
const fetchColecaoById = async (id: string): Promise<Colecao> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Função para criar uma nova colecao
const addColecao = async (novaColecao: Omit<Colecao, 'id'>): Promise<Colecao> => {
  const response = await axios.post(API_URL, novaColecao);
  return response.data;
};

// Função para atualizar uma colecao
const updateColecao = async (colecao: Colecao): Promise<Colecao> => {
  const response = await axios.put(`${API_URL}/${colecao.id}`, colecao);
  return response.data;
};

// Função para excluir uma colecao
const deleteColecao = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// Função para adicionar um bookmark a uma coleção
const addBookmarkToColecao = async (colecaoId: string, bookmarkId: string): Promise<Colecao> => {
  const response = await axios.post(
    `${API_URL}/${colecaoId}/bookmarks/${bookmarkId}`
  );
  return response.data;
};

// Função para remover um bookmark de uma coleção
const removeBookmarkFromColecao = async (colecaoId: string, bookmarkId: string): Promise<Colecao> => {
  const response = await axios.delete(
    `${API_URL}/${colecaoId}/bookmarks/${bookmarkId}`
  );
  return response.data;
};

// Função para obter os bookmarks de uma coleção
const fetchBookmarksByColecao = async (colecaoId: string): Promise<Bookmark[]> => {
  const response = await axios.get(`${API_URL}/${colecaoId}/bookmarks`);
  return response.data;
};

// Hook para obter todas as coleções
export const useColecoes = () => {
  return useQuery<Colecao[], Error>({
    queryKey: ['colecoes'],
    queryFn: fetchColecoes,
  });
};

// Hook para obter uma colecao por ID
export const useColecaoById = (id: string) => {
  return useQuery<Colecao, Error>({
    queryKey: ['colecao', id],
    queryFn: () => fetchColecaoById(id),
    enabled: !!id,  // Certificando-se de que a query só é chamada se o ID for válido
  });
};

// Hook para criar uma nova colecao
export const useCreateColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, Omit<Colecao, 'id'>>({
    mutationFn: addColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};

// Hook para atualizar uma colecao
export const useUpdateColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, Colecao>({
    mutationFn: updateColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};

// Hook para excluir uma colecao
export const useDeleteColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteColecao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};

// Hook para adicionar um bookmark a uma coleção
export const useAddBookmarkToColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, { colecaoId: string; bookmarkId: string }>({
    mutationFn: ({ colecaoId, bookmarkId }) => addBookmarkToColecao(colecaoId, bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};

// Hook para remover um bookmark de uma coleção
export const useRemoveBookmarkFromColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<Colecao, Error, { colecaoId: string; bookmarkId: string }>({
    mutationFn: ({ colecaoId, bookmarkId }) => removeBookmarkFromColecao(colecaoId, bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};

// Hook para listar os bookmarks de uma coleção
export const useBookmarksByColecao = (colecaoId: string) => {
  return useQuery<Bookmark[], Error>({
    queryKey: ['bookmarks', colecaoId],
    queryFn: () => fetchBookmarksByColecao(colecaoId),
    enabled: !!colecaoId, // Certificando-se de que a query só é chamada se o colecaoId for válido
  });
};
