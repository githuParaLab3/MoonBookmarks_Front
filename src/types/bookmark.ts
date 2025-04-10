import { Status, Tipo } from "./enums";
import { Obra } from "./obra";


export type Bookmark = {
    id: string;
    progresso: number;  
    comentario?: string;
    status: Status;
    obra: Obra  
    usuarioId: string;
    colecoes: string[];
  };
  
  