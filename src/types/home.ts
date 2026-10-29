import type { Filme } from "./filme";

export type AcaoAtividade = "avaliou" | "adicionou à watchlist";

/*feed "Atividade dos amigos" */
export interface AtividadeAmigo {
  id: number;
  usuario: string;
  avatar: string;
  acao: AcaoAtividade;
  filme: Filme;
  /** Só existe quando a ação é "avaliou" */
  nota?: number;
  comentario?: string;
  tempo: string;
}

/*seção "Críticas em destaque" */
export interface CriticaDestaque {
  id: number;
  usuario: string;
  avatar: string;
  filme: Filme;
  nota: number;
  texto: string;
  curtidas: number;
}

export type StatusCinema = "EM CARTAZ" | "EM BREVE";

/*lançamento da sidebar */
export interface NovidadeCinema {
  id: number;
  titulo: string;
  poster: string;
  diretor: string;
  ano: number;
  /** null quando o filme ainda não estreou */
  nota: number | null;
  status: StatusCinema;
}

export interface SugestaoSeguir {
  id: number;
  nome: string;
  avatar: string;
  detalhe: string;
}

/** Números da sidebar  */
export interface ResumoMes {
  assistidos: number;
  avaliados: number;
  horas: number;
  naFila: number;
}
