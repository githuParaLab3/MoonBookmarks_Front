import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Obra } from '../types/obra';

const fetchObras = async (): Promise<Obra[]> => {
  const response = await axios.get('https://moonbookmarks-back.onrender.com/obras');
  return response.data;
};


const fetchObra = async (id: string): Promise<Obra> => {
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/obras/${id}`);
  return response.data;
};


const addObra = async (novaObra: Omit<Obra, 'id'>): Promise<Obra> => {
  const response = await axios.post('https://moonbookmarks-back.onrender.com/obras', novaObra);
  return response.data;
};


const updateObra = async (id: string, obraAtualizada: Partial<Obra>): Promise<Obra> => {
  const response = await axios.put(`https://moonbookmarks-back.onrender.com/obras/${id}`, obraAtualizada);
  return response.data;
};


const deleteObra = async (id: string): Promise<void> => {
  await axios.delete(`https://moonbookmarks-back.onrender.com/obras/${id}`);
};


export const useObras = () => {
  return useQuery<Obra[], Error>({
    queryKey: ['obras'],
    queryFn: fetchObras,
  });
};


export const useObra = (id: string) => {
  return useQuery<Obra, Error>({
    queryKey: ['obra', id],
    queryFn: () => fetchObra(id),
    enabled: !!id, 
  });
};


export const useCreateObra = () => {
  const queryClient = useQueryClient();

  return useMutation<Obra, Error, Omit<Obra, 'id'>>({
    mutationFn: addObra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obras'] });
    },
  });
};


export const useUpdateObra = () => {
  const queryClient = useQueryClient();

  return useMutation<Obra, Error, { id: string; obraAtualizada: Partial<Obra> }>({
    mutationFn: ({ id, obraAtualizada }) => updateObra(id, obraAtualizada),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obras'] });
    },
  });
};


export const useDeleteObra = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteObra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['obras'] });
    },
  });
};
