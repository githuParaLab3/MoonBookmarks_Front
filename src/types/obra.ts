import { Tipo } from "./enums";

export interface Obra {
    id: string;
    titulo: string;
    descricao: string;
    autor: string;
    tipo: Tipo;
    generos: string[];
    imagem: string;
  }
  