import styles from "./Comments.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Watchlist({ titulo, subtitulo, lista, limite = 5 }) {
  const navigate = useNavigate();
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(limite);
  const filmesVisiveis = lista.slice(0, quantidadeVisivel);
  const temMais = lista.length > quantidadeVisivel;
  const carregarMais = () => {
    setQuantidadeVisivel((atual) => atual + limite);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.titulo}>{titulo}</h1>
          <span className={styles.subtitulo}>{subtitulo}</span>
        </div>
        <div className={styles.lista}>
          {filmesVisiveis.map((filme) => (
            <div className={styles.item}>
              <img
                src={filme.poster}
                alt={filme.titulo}
                className={styles.poster}
              />

              <div className={styles.info}>
                <p className={styles.tituloFilme}>{filme.titulo}</p>
                <p className={styles.detalhes}>
                  {filme.diretor} - {filme.ano}
                </p>
              </div>

              <button className={styles.buttonInfo} onClick={() => navigate(`/filme/${filme.id}`)}>
                ⓘ
              </button>
            </div>
          ))}
        </div>
          {temMais && (
            <button className={styles.verMais} onClick={carregarMais}>
              Ver mais
            </button>
          )}
          {quantidadeVisivel > limite && (
            <button
              className={styles.verMais}
              onClick={() => setQuantidadeVisivel(limite)}
            >
              Ver menos
            </button>
          )}
      </div>
    </>
  );
}