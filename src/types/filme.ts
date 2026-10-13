/* Uma avaliação feito por um usuário sobre um filme. */
export interface Avaliacao {
  id: number;
  nota: number;
  texto: string;
  autor: string;
  data: string;
  curtidas: number;
  curtidoPeloUsuario: boolean;
}

/**ator do elenco principal */
export interface Ator {
  nome: string;
  personagem: string;
  foto: string;
}

/*Ficha técnica de produção do filme. */
export interface FichaTecnica {
  direcao: string;
  roteiro: string;
  fotografia: string;
  trilhaSonora: string;
  producao: string;
  pais: string;
  idioma: string;
}

/*filme completo */
export interface Filme {
  id: number;
  titulo: string;
  poster: string;
  diretor: string;
  ano: number;
  favorito: boolean;
  naWatchlist: boolean;
  generos: string[];
  duracao: string;
  notaMedia: number;
  totalAvaliacoes: string;
  watched: boolean;
  avaliacoes: Avaliacao[];
  elenco?: Ator[];
  fichaTecnica?: FichaTecnica;
  totalListas?: string;
  sinopse?: string;
}
