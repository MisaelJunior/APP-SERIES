import styles from "./GridFilmes.module.css";
import { useState } from "react";

export default function GridFilmes({ titulo, subtitulo, lista, limite = 5}) {
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(limite);
  const filmesVisiveis = lista.slice(0, quantidadeVisivel);
  const temMais = lista.length > quantidadeVisivel;
  const carregarMais = () => {
    setQuantidadeVisivel((atual) => atual + limite);
  }
  return (
    <>
    <div className={styles.container}>
        <div className={styles.listTitle}>
          <h1 className={styles.listName}>{titulo}</h1>
          <h2 className={styles.listInfo}>{subtitulo}</h2>
        </div>
        <div className={styles.grid}>
          {filmesVisiveis.map((filme) => (
            <div key={filme.id} className={styles.card}>
              <img src={filme.poster} alt={filme.titulo} />
              <p className={styles.tituloCard}>{filme.titulo}</p>
              {(filme.notaMedia || filme.ano) && (
                <div className={styles.metaCard}>
                  {filme.notaMedia && (
                    <span className={styles.estrelasCard}>
                      {[1, 2, 3, 4, 5].map((posicao) => (
                        <span
                          key={posicao}
                          className={
                            posicao <= Math.round(filme.notaMedia)
                              ? styles.estrelaPreenchidaCard
                              : styles.estrelaVaziaCard
                          }
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  )}
                  {filme.ano && <span className={styles.anoCard}>{filme.ano}</span>}
                </div>
              )}
            </div>
          ))}

          {temMais && (
            <button className={styles.verMais} onClick={carregarMais}>
              <img src={lista[quantidadeVisivel].poster} alt={lista[quantidadeVisivel].titulo} className={styles.posterFundo}/>
              <span className={styles.textoVerMais}>Ver mais</span>
            </button>
          )}

        </div>
          {quantidadeVisivel > limite && (
            <div className={styles.verMenosWrapper}>
              <button className={styles.verMenos} onClick={() => setQuantidadeVisivel(limite)}>Ver menos</button>
            </div>
          )}
    </div>
    </>
  );
}