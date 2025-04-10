// src/hooks/useColecoes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Colecao } from '../types/colecao';  // Ajuste conforme o local do tipo Colecao

// Função para obter todas as coleções
const fetchColecoes = async (): Promise<Colecao[]> => {
  const response = await axios.get('https://moonbookmarks-back.onrender.com/colecoes');
  return response.data;
};

// Função para obter uma colecao por ID
const fetchColecaoById = async (id: string): Promise<Colecao> => {  // O id é string conforme sua model
  const response = await axios.get(`https://moonbookmarks-back.onrender.com/colecoes/${id}`);
  return response.data;
};

// Função para criar uma nova colecao
const addColecao = async (novaColecao: Omit<Colecao, 'id'>): Promise<Colecao> => {
  const response = await axios.post('https://moonbookmarks-back.onrender.com/colecoes', novaColecao);
  return response.data;
};

// Função para atualizar uma colecao
const updateColecao = async (id: string, colecaoAtualizada: Partial<Colecao>): Promise<Colecao> => {  // O id é string conforme sua model
  const response = await axios.put(`https://moonbookmarks-back.onrender.com/colecoes/${id}`, colecaoAtualizada);
  return response.data;
};

// Função para excluir uma colecao
const deleteColecao = async (id: string): Promise<void> => {  // O id é string conforme sua model
  await axios.delete(`https://moonbookmarks-back.onrender.com/colecoes/${id}`);
};

// Hook para obter todas as coleções
export const useColecoes = () => {
  return useQuery<Colecao[], Error>({
    queryKey: ['colecoes'],
    queryFn: fetchColecoes,
  });
};

// Hook para obter uma colecao por ID
export const useColecaoById = (id: string) => {  // O id é string conforme sua model
  return useQuery<Colecao, Error>({
    queryKey: ['colecao', id],
    queryFn: () => fetchColecaoById(id),
    enabled: !!id,  // Só ativa a query quando o id for válido
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

  return useMutation<Colecao, Error, { id: string; colecaoAtualizada: Partial<Colecao> }>({  // O id é string conforme sua model
    mutationFn: ({ id, colecaoAtualizada }) => updateColecao(id, colecaoAtualizada),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};

// Hook para excluir uma colecao
export const useDeleteColecao = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({  // O id é string conforme sua model
    mutationFn: deleteColecao,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['colecoes'] });
    },
  });
};
