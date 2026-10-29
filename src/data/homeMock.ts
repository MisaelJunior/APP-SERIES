import { todosOsFilmes } from "./filmesMock";
import type { Filme } from "../types/filme";
import type {
  AtividadeAmigo,
  CriticaDestaque,
  NovidadeCinema,
  ResumoMes,
  SugestaoSeguir,
} from "../types/home";

const avatar = (nome: string, fundo = "7223b7") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=${fundo}&color=fff&bold=true`;

/* Busca um filme do mock pelo id e falha se o id não existir. */
function filmePorId(id: number): Filme {
  const filme = todosOsFilmes.find((item) => item.id === id);
  if (!filme) {
    throw new Error(`Filme ${id} não encontrado em filmesMock`);
  }
  return filme;
}

/*Filme em destaque no banner */
export const filmeDaSemana: Filme = filmePorId(6);

/* filmes mais bem avaliados, usados em "Trending esta semana" */
export const trendingSemana: Filme[] = [...todosOsFilmes]
  .sort((a, b) => b.notaMedia - a.notaMedia)
  .slice(0, 5);

export const atividadesAmigos: AtividadeAmigo[] = [
  {
    id: 1,
    usuario: "jubileia_67",
    avatar: avatar("jubileia 67"),
    acao: "avaliou",
    filme: filmePorId(3),
    nota: 5,
    comentario: "Ótima recomendação do jubileu",
    tempo: "há 14min",
  },
  {
    id: 2,
    usuario: "jubileia_67",
    avatar: avatar("jubileia 67"),
    acao: "adicionou à watchlist",
    filme: filmePorId(11),
    tempo: "há 1h",
  },
];

export const criticasDestaque: CriticaDestaque[] = [
  {
    id: 1,
    usuario: "carlboy",
    avatar: avatar("carl boy", "1a0e2e"),
    filme: filmePorId(1),
    nota: 5,
    texto: "Filmaço, direção impecável do começo ao fim.",
    curtidas: 144,
  },
  {
    id: 2,
    usuario: "solotov",
    avatar: avatar("solo tov", "1a0e2e"),
    filme: filmePorId(12),
    nota: 5,
    texto: "Final surpreendente, vale muito a pena.",
    curtidas: 67,
  },
];

// os posters abaixo sao provisorios (reaproveitam filmes do mock)
export const novidadesCinema: NovidadeCinema[] = [
  { id: 1, titulo: "Spider-Man: Brand New Day", poster: filmePorId(10).poster, diretor: "Destin Daniel Cretton", ano: 2026, nota: 4.1, status: "EM CARTAZ" },
  { id: 2, titulo: "Avengers: Doomsday", poster: filmePorId(11).poster, diretor: "Joe Russo, Anthony Russo", ano: 2026, nota: null, status: "EM BREVE" },
  { id: 3, titulo: "Spider-Man: Brand New Day", poster: filmePorId(10).poster, diretor: "Destin Daniel Cretton", ano: 2026, nota: 4.1, status: "EM CARTAZ" },
  { id: 4, titulo: "Avengers: Doomsday", poster: filmePorId(11).poster, diretor: "Joe Russo, Anthony Russo", ano: 2026, nota: null, status: "EM BREVE" },
  { id: 5, titulo: "Spider-Man: Brand New Day", poster: filmePorId(10).poster, diretor: "Destin Daniel Cretton", ano: 2026, nota: 4.1, status: "EM CARTAZ" },
];

export const sugestoesSeguir: SugestaoSeguir[] = [
  { id: 1, nome: "Samuel Palombo", avatar: avatar("Samuel Palombo", "1a0e2e"), detalhe: "1 amigo em comum" },
  { id: 2, nome: "Neymar Jr", avatar: avatar("Neymar Jr", "1a0e2e"), detalhe: "" },
  { id: 3, nome: "Kelvin Oliveira", avatar: avatar("Kelvin Oliveira", "1a0e2e"), detalhe: "" },
];

export const resumoMes: ResumoMes = {
  assistidos: 14,
  avaliados: 9,
  horas: 26,
  naFila: 67,
};
