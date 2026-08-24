import styles from "./Reviews.module.css";
import { useState } from "react";
import calcularMedia from "../functions/calcularMedia";

export default function Review({ titulo, subtitulo, lista, limite = 5 }) {
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(limite);
  const filmesVisiveis = lista.slice(0, quantidadeVisivel);
  const temMais = lista.length > quantidadeVisivel;

  const carregarMais = () => {
    setQuantidadeVisivel((atual) => atual + limite);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listTitle}>
        <h1 className={styles.listName}>{titulo}</h1>
        <h2 className={styles.listInfo}>{subtitulo}</h2>
      </div>

      <div className={styles.list}>
        {filmesVisiveis.map((filme) => (
          <div key={filme.id} className={styles.item}>
            <img
              src={filme.poster}
              alt={filme.titulo}
              className={styles.poster}
            />

            <div className={styles.info}>
              <p className={styles.tituloFilme}>
                {filme.titulo} <span className={styles.ano}>{filme.ano}</span>
              </p>
              <p className={styles.comentario}>{filme.avaliacao.texto}</p>
              <p className={styles.detalhes}>
                {filme.avaliacao.autor} · assistido em{" "}
                {filme.avaliacao.data
                  ? new Date(filme.avaliacao.data).toLocaleDateString("pt-BR")
                  : "data não informada"}
              </p>
            </div>

            <div className={styles.avaliacaoLado}>
              {/* {filme.favorito && <span className={styles.coracao}>♥</span>} */}
              <div className={styles.estrelas}>
                {[1, 2, 3, 4, 5].map((posicao) => (
                  <span
                    key={posicao}
                    className={
                      posicao <= filme.avaliacoes.calcularMedia(filme.avaliacoes)
                        ? styles.estrelaPreenchida
                        : styles.estrelaVazia
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
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
          className={styles.verMenos}
          onClick={() => setQuantidadeVisivel(limite)}
        >
          Ver menos
        </button>
      )}
    </div>
  );
}
