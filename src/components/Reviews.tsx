import styles from "./Reviews.module.css";
import { useState } from "react";
import calcularMedia from "../functions/calcularMedia";
import type { Filme } from "../types/filme";

interface ReviewProps {
  titulo: string;
  subtitulo: string;
  lista: Filme[];
  limite?: number;
}

export default function Review({ titulo, subtitulo, lista, limite = 5 }: ReviewProps) {
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
        {filmesVisiveis.map((filme) => {
          const avaliacaoDestaque = filme.avaliacoes[0];
          const mediaArredondada = Math.round(calcularMedia(filme.avaliacoes));

          return (
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
                <p className={styles.comentario}>
                  {avaliacaoDestaque?.texto ?? "Ainda não há avaliações."}
                </p>
                <p className={styles.detalhes}>
                  {avaliacaoDestaque?.autor ?? "—"} · assistido em{" "}
                  {avaliacaoDestaque?.data
                    ? new Date(avaliacaoDestaque.data).toLocaleDateString("pt-BR")
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
                        posicao <= mediaArredondada
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
          );
        })}
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
