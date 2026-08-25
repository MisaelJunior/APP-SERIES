import styles from "./FilmeDetalhes.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { todosOsFilmes } from "../../data/filmesMock";
import { useState } from "react";
import GridFilmes from "../../components/GridFilmes";

function Estrelas({ nota }) {
  return [1, 2, 3, 4, 5].map((posicao) => (
    <span
      key={posicao}
      className={posicao <= Math.round(nota) ? styles.estrelaPreenchida : styles.estrelaVazia}
    >
      ★
    </span>
  ));
}

export default function FilmeDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const filme = todosOsFilmes.find((filme) => filme.id === Number(id));

  const [abaAtiva, setAbaAtiva] = useState("Populares");
  const [avaliacaoUsuario, setAvaliacaoUsuario] = useState(0);
  const [hoverAvaliacao, setHoverAvaliacao] = useState(0);
  const [jaAssistiu, setJaAssistiu] = useState(filme?.watched ?? false);
  const [naWatchlist, setNaWatchlist] = useState(filme?.naWatchlist ?? false);
  const [favorito, setFavorito] = useState(filme?.favorito ?? false);

  if (!filme) {
    return <p>Filme não encontrado.</p>;
  }

  const avaliacoes = filme.avaliacoes ?? [];
  const comentariosPopulares = [...avaliacoes].sort((a, b) => b.curtidas - a.curtidas);
  const comentariosRecentes = [...avaliacoes].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );
  const comentariosVisiveis = abaAtiva === "Populares" ? comentariosPopulares : comentariosRecentes;

  const similaresPorGenero = todosOsFilmes.filter(
    (outro) =>
      outro.id !== filme.id &&
      outro.generos.some((genero) => filme.generos.includes(genero))
  );
  const filmesSimilares =
    similaresPorGenero.length > 0
      ? similaresPorGenero.slice(0, 5)
      : todosOsFilmes.filter((outro) => outro.id !== filme.id).slice(0, 5);

  return (
    <div className={styles.pagina}>
      <div className={styles.header}>
        <button className={styles.voltar} onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <span className={styles.tituloHeader}>
          {filme.titulo} · {filme.ano}
        </span>
      </div>

      <div className={styles.banner}>
        <img src={filme.poster} alt="" className={styles.bannerImagem} />
        <div className={styles.bannerGradiente}></div>

        <div className={styles.conteudoPrincipal}>
          <img src={filme.poster} alt={filme.titulo} className={styles.poster} />
          <div className={styles.infoFilme}>
            <div className={styles.generos}>
              {filme.generos.map((genero) => (
                <span key={genero} className={styles.badge}>
                  {genero}
                </span>
              ))}
            </div>

            <h1 className={styles.titulo}>{filme.titulo}</h1>

            <p className={styles.dados}>
              {filme.ano} · {filme.duracao} · {filme.diretor} ·{" "}
              <span className={styles.nota}>★ {filme.notaMedia}</span>{" "}
              ({filme.totalAvaliacoes} avaliações)
            </p>

            <p className={styles.sinopse}>{filme.sinopse}</p>

            <div className={styles.acoes}>
              <button
                className={`${styles.botaoAcao} ${jaAssistiu ? styles.ativoAcao : ""}`}
                onClick={() => setJaAssistiu((v) => !v)}
              >
                {jaAssistiu ? "✓ Já Assisti" : "👁 Marcar como assistido"}
              </button>
              <button
                className={`${styles.botaoAcaoOutline} ${naWatchlist ? styles.ativoAcao : ""}`}
                onClick={() => setNaWatchlist((v) => !v)}
              >
                🔖 Watchlist
              </button>
              <button
                className={styles.botaoFavorito}
                onClick={() => setFavorito((v) => !v)}
                aria-label="Favoritar"
              >
                {favorito ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.campoAvaliacoes}>
          <div className={styles.avaliar}>
            <span className={styles.avaliarLabel}>SUA AVALIAÇÃO</span>
            <div className={styles.estrelasClicaveis}>
              {[1, 2, 3, 4, 5].map((posicao) => (
                <span
                  key={posicao}
                  className={
                    posicao <= (hoverAvaliacao || avaliacaoUsuario)
                      ? styles.estrelaPreenchida
                      : styles.estrelaVazia
                  }
                  onMouseEnter={() => setHoverAvaliacao(posicao)}
                  onMouseLeave={() => setHoverAvaliacao(0)}
                  onClick={() => setAvaliacaoUsuario(posicao)}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.avaliarAjuda}>
              {avaliacaoUsuario > 0
                ? `Você avaliou com ${avaliacaoUsuario} estrela${avaliacaoUsuario > 1 ? "s" : ""}`
                : "clique para avaliar"}
            </span>
          </div>

          <div className={styles.divisor}></div>

          <div className={styles.avaliacoesResumo}>
            <div className={styles.statItem}>
              <span className={styles.statNumero}>{filme.notaMedia}</span>
              <span className={styles.statLabel}>Nota média</span>
              <span className={styles.statSub}>de 5.0</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumero}>{filme.totalAvaliacoes}</span>
              <span className={styles.statLabel}>Avaliações</span>
              <span className={styles.statSub}>na comunidade</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumero}>{filme.totalListas}</span>
              <span className={styles.statLabel}>Listas</span>
              <span className={styles.statSub}>incluem este filme</span>
            </div>
          </div>
        </div>

        <div className={styles.conteudo}>
          <div className={styles.comentarios}>
            <nav className={styles.navMenu}>
              <ul className={styles.ulNavMenu}>
                <li
                  className={abaAtiva === "Populares" ? styles.ativo : ""}
                  onClick={() => setAbaAtiva("Populares")}
                >
                  Mais Populares
                </li>
                <li
                  className={abaAtiva === "Recentes" ? styles.ativo : ""}
                  onClick={() => setAbaAtiva("Recentes")}
                >
                  Mais Recentes
                </li>
              </ul>
            </nav>

            <div className={styles.listaComentarios}>
              {comentariosVisiveis.map((avaliacao) => (
                <div key={avaliacao.id} className={styles.comentarioCard}>
                  <div className={styles.comentarioHeader}>
                    <div className={styles.comentarioAutor}>
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          avaliacao.autor
                        )}&background=7223b7&color=fff&bold=true`}
                        alt={avaliacao.autor}
                        className={styles.avatar}
                      />
                      <div>
                        <p className={styles.nomeAutor}>
                          @{avaliacao.autor.toLowerCase().replace(/\s+/g, "_")}
                        </p>
                        <span className={styles.dataComentario}>
                          {new Date(avaliacao.data).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className={styles.estrelasComentario}>
                      <Estrelas nota={avaliacao.nota} />
                    </div>
                  </div>

                  <p className={styles.textoComentario}>{avaliacao.texto}</p>

                  <div className={styles.comentarioFooter}>
                    <span className={styles.curtidas}>👍 {avaliacao.curtidas}</span>
                    <button className={styles.responder} disabled>
                      💬 Em breve
                    </button>
                  </div>
                </div>
              ))}

              {comentariosVisiveis.length === 0 && (
                <p className={styles.semComentarios}>Ainda não há avaliações para este filme.</p>
              )}
            </div>
          </div>

          <div className={styles.dadosFilme}>
            <div className={styles.cast}>
              <h3 className={styles.tituloLateral}>Elenco Principal</h3>
              <div className={styles.listaElenco}>
                {filme.elenco?.map((ator) => (
                  <div key={ator.nome} className={styles.itemElenco}>
                    <img src={ator.foto} alt={ator.nome} className={styles.fotoElenco} />
                    <div>
                      <p className={styles.nomeAtor}>{ator.nome}</p>
                      <span className={styles.personagemAtor}>{ator.personagem}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.fichaTecnica}>
              <h3 className={styles.tituloLateral}>Ficha Técnica</h3>
              <div className={styles.tabelaFicha}>
                <div className={styles.linhaFicha}>
                  <span>Direção</span>
                  <span>{filme.fichaTecnica?.direcao}</span>
                </div>
                <div className={styles.linhaFicha}>
                  <span>Roteiro</span>
                  <span>{filme.fichaTecnica?.roteiro}</span>
                </div>
                <div className={styles.linhaFicha}>
                  <span>Fotografia</span>
                  <span>{filme.fichaTecnica?.fotografia}</span>
                </div>
                <div className={styles.linhaFicha}>
                  <span>Trilha sonora</span>
                  <span>{filme.fichaTecnica?.trilhaSonora}</span>
                </div>
                <div className={styles.linhaFicha}>
                  <span>Produção</span>
                  <span>{filme.fichaTecnica?.producao}</span>
                </div>
                <div className={styles.linhaFicha}>
                  <span>País</span>
                  <span>{filme.fichaTecnica?.pais}</span>
                </div>
                <div className={styles.linhaFicha}>
                  <span>Idioma</span>
                  <span>{filme.fichaTecnica?.idioma}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GridFilmes
          titulo="Filmes Similares"
          subtitulo="você pode gostar"
          lista={filmesSimilares}
        />
      </div>
    </div>
  );
}