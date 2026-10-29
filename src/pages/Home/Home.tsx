import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  filmeDaSemana,
  trendingSemana,
  atividadesAmigos,
  criticasDestaque,
  novidadesCinema,
  sugestoesSeguir,
  resumoMes,
} from "../../data/homeMock";
 
interface EstrelasProps {
  nota: number;
}

function Estrelas({ nota }: EstrelasProps) {
  return (
    <span className={styles.estrelas}>
      {[1, 2, 3, 4, 5].map((posicao) => (
        <span
          key={posicao}
          className={posicao <= Math.round(nota) ? styles.estrelaCheia : styles.estrelaVazia}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [naWatchlist, setNaWatchlist] = useState(filmeDaSemana.naWatchlist);
  const [seguindo, setSeguindo] = useState<number[]>([]);

  const alternarSeguir = (id: number) => {
    setSeguindo((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    );
  };

  return (
    <div className={styles.pagina}>
      <Navbar />

      <section className={styles.hero}>
        <img src={filmeDaSemana.poster} alt="" className={styles.heroFundo} />
        <div className={styles.heroGradiente}></div>

        <div className={styles.heroConteudo}>
          <img
            src={filmeDaSemana.poster}
            alt={filmeDaSemana.titulo}
            className={styles.heroPoster}
          />
          <div className={styles.heroInfo}>
            <span className={styles.heroRotulo}>✦ FILME DA SEMANA</span>
            <h1 className={styles.heroTitulo}>{filmeDaSemana.titulo}</h1>
            <p className={styles.heroMeta}>
              {filmeDaSemana.ano} · {filmeDaSemana.duracao} · {filmeDaSemana.diretor} ·{" "}
              <span className={styles.destaque}>★ {filmeDaSemana.notaMedia}</span> (
              {filmeDaSemana.totalAvaliacoes} avaliações)
            </p>
            <div className={styles.generos}>
              {filmeDaSemana.generos.map((genero) => (
                <span key={genero} className={styles.badge}>
                  {genero}
                </span>
              ))}
            </div>
            <p className={styles.heroSinopse}>{filmeDaSemana.sinopse}</p>
            <div className={styles.heroAcoes}>
              <Link to={`/filme/${filmeDaSemana.id}`} className={styles.botaoPrimario}>
                ▶ Ver detalhes
              </Link>
              <button
                className={`${styles.botaoSecundario} ${naWatchlist ? styles.botaoAtivo : ""}`}
                onClick={() => setNaWatchlist((v) => !v)}
              >
                🔖 {naWatchlist ? "Na watchlist" : "Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.corpo}>

        <main className={styles.principal}>
          <section>
            <div className={styles.secaoTopo}>
              <h2 className={styles.secaoTitulo}>Trending esta semana</h2>
              <span className={styles.verTudo}>Ver Tudo →</span>
            </div>
            <div className={styles.trending}>
              {trendingSemana.map((filme, indice) => (
                <Link key={filme.id} to={`/filme/${filme.id}`} className={styles.trendingCard}>
                  <div className={styles.trendingPosterBox}>
                    <span className={`${styles.rank} ${indice < 3 ? styles.rankTop : ""}`}>
                      {indice + 1}
                    </span>
                    <img src={filme.poster} alt={filme.titulo} className={styles.trendingPoster} />
                  </div>
                  <p className={styles.trendingTitulo}>{filme.titulo}</p>
                  <div className={styles.trendingNota}>
                    <Estrelas nota={filme.notaMedia} />
                    <span>{Math.round(filme.notaMedia)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.secaoTitulo}>Atividade dos amigos</h2>
            <div className={styles.lista}>
              {atividadesAmigos.map((atividade) => (
                <div key={atividade.id} className={styles.card}>
                  <div className={styles.atividadeTopo}>
                    <img src={atividade.avatar} alt={atividade.usuario} className={styles.avatar} />
                    <p className={styles.atividadeTexto}>
                      <strong>@{atividade.usuario}</strong>{" "}
                      <span className={styles.suave}>
                        {atividade.acao === "avaliou" ? "assistiu e avaliou" : atividade.acao}
                      </span>{" "}
                      <strong>{atividade.filme.titulo}</strong>
                    </p>
                    <span className={styles.tempo}>{atividade.tempo}</span>
                  </div>
                  <div className={styles.atividadeCorpo}>
                    <img
                      src={atividade.filme.poster}
                      alt={atividade.filme.titulo}
                      className={styles.miniPoster}
                    />
                    <div>
                      {atividade.nota !== undefined && <Estrelas nota={atividade.nota} />}
                      {atividade.comentario && (
                        <p className={styles.comentario}>"{atividade.comentario}"</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.secaoTitulo}>Críticas em destaque</h2>
            <div className={styles.lista}>
              {criticasDestaque.map((critica) => (
                <div key={critica.id} className={`${styles.card} ${styles.critica}`}>
                  <img
                    src={critica.filme.poster}
                    alt={critica.filme.titulo}
                    className={styles.miniPoster}
                  />
                  <div className={styles.criticaInfo}>
                    <div className={styles.criticaTopo}>
                      <img src={critica.avatar} alt={critica.usuario} className={styles.avatarPequeno} />
                      <p className={styles.atividadeTexto}>
                        <strong>@{critica.usuario}</strong> <span className={styles.suave}>sobre</span>{" "}
                        <strong>{critica.filme.titulo}</strong>
                      </p>
                      <Estrelas nota={critica.nota} />
                    </div>
                    <p className={styles.comentario}>"{critica.texto}"</p>
                    <span className={styles.curtidas}>👍 {critica.curtidas}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.sidebarTitulo}>Novidades nos cinemas</h3>
            <ul className={styles.novidades}>
              {novidadesCinema.map((novidade) => (
                <li key={novidade.id} className={styles.novidade}>
                  <img src={novidade.poster} alt={novidade.titulo} className={styles.novidadePoster} />
                  <div className={styles.novidadeInfo}>
                    <p className={styles.novidadeTitulo}>{novidade.titulo}</p>
                    <p className={styles.suave}>
                      {novidade.diretor} · {novidade.ano}
                    </p>
                    <span
                      className={`${styles.status} ${
                        novidade.status === "EM CARTAZ" ? styles.emCartaz : styles.emBreve
                      }`}
                    >
                      {novidade.status}
                    </span>
                  </div>
                  <span className={styles.destaque}>
                    {novidade.nota !== null ? `★ ${novidade.nota}` : "★ -"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sidebarTitulo}>Quem seguir</h3>
            <ul className={styles.sugestoes}>
              {sugestoesSeguir.map((pessoa) => (
                <li key={pessoa.id} className={styles.sugestao}>
                  <img src={pessoa.avatar} alt={pessoa.nome} className={styles.avatar} />
                  <div className={styles.sugestaoInfo}>
                    <p className={styles.novidadeTitulo}>{pessoa.nome}</p>
                    {pessoa.detalhe && <p className={styles.destaque}>{pessoa.detalhe}</p>}
                  </div>
                  <button
                    className={`${styles.botaoSeguir} ${
                      seguindo.includes(pessoa.id) ? styles.botaoAtivo : ""
                    }`}
                    onClick={() => alternarSeguir(pessoa.id)}
                  >
                    {seguindo.includes(pessoa.id) ? "Seguindo" : "+ Seguir"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.sidebarTitulo}>Seu mês em filmes</h3>
            <div className={styles.resumo}>
              <div className={styles.resumoItem}>
                <span>🎞</span>
                <strong>{resumoMes.assistidos}</strong>
                <small>ASSISTIDOS</small>
              </div>
              <div className={styles.resumoItem}>
                <span>⭐</span>
                <strong>{resumoMes.avaliados}</strong>
                <small>AVALIADOS</small>
              </div>
              <div className={styles.resumoItem}>
                <span>🕒</span>
                <strong>{resumoMes.horas}h</strong>
                <small>HORAS</small>
              </div>
              <div className={styles.resumoItem}>
                <span>📋</span>
                <strong>{resumoMes.naFila}</strong>
                <small>NA FILA</small>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
