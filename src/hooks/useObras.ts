import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Obra } from '../types/obra';

// Função para obter todas as obras
const fetchObras = async (): Promise<Obra[]> => {
  const response = await axios.get('https://moonbookmarks-back.onrender.com/obras');
  return response.data;
};

// Função para obter uma obra específica
const fetchObra = async (id: string): Promise<Obra> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/obras/${id}`);
  return response.data;
};

// Função para adicionar uma nova obra
const addObra = async (novaObra: Omit<Obra, 'id'>): Promise<Obra> => {
  const response = await axios.post('https://moonbookmarks-back.onrender.com/obras', novaObra);
  return response.data;
};

// Função para atualizar uma obra existente
const updateObra = async (id: string, obraAtualizada: Partial<Obra>): Promise<Obra> => {
  const response = await axios.put(`https://moonbookmarks-back.onrender.com/obras/${id}`, obraAtualizada);
  return response.data;
};

// Função para excluir uma obra
const deleteObra = async (id: string): Promise<void> => {
  await axios.delete(`https://moonbookmarks-back.onrender.com/obras/${id}`);
};

// Hook para obter todas as obras
export const useObras = () => {
  return useQuery<Obra[], Error>({
    queryKey: ['obras'],
    queryFn: fetchObras,
  });
};

// Hook para obter uma obra específica
export const useObra = (id: string) => {
  return useQuery<Obra, Error>({
    queryKey: ['obra', id],
    queryFn: () => fetchObra(id),
    enabled: !!id, // Só vai rodar a query se o ID estiver disponível
  });
};

// Hook para criar uma nova obra
export const useCreateObra = () => {
  const queryClient = useQueryClient();

  return useMutation<Obra, Error, Omit<Obra, 'id'>>({
    mutationFn: addObra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obras'] });
    },
  });
};

// Hook para atualizar uma obra
export const useUpdateObra = () => {
  const queryClient = useQueryClient();

  return useMutation<Obra, Error, { id: string; obraAtualizada: Partial<Obra> }>({
    mutationFn: ({ id, obraAtualizada }) => updateObra(id, obraAtualizada),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obras'] });
    },
  });
};

// Hook para excluir uma obra
export const useDeleteObra = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteObra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obras'] });
    },
  });
};
