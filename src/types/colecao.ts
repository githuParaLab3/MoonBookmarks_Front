import { Bookmark } from "./bookmark";
import { Usuario } from "./usuario";

export interface Colecao {
    id: string; 
    titulo: string;
    descricao?: string; 
    foto?: string; 
    usuario?: Usuario; 
    bookmarks?: Bookmark[];
    bookmarkIds?: String[];
  }
  