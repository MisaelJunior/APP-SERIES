import styles from "./GridFilmes.module.css";
import { useState } from "react";

export default function GridFilmes({ titulo, subtitulo, lista, limite = 4}) {
  const [expandido, setExpandido] = useState(false);
  const filmesVisiveis = expandido ? lista : lista.slice(0, limite);
  const temMais = !expandido && lista.length > limite;
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
              <p>{filme.titulo}</p>
            </div>
          ))}

          {temMais && (
            <button className={styles.verMais} onClick={() => setExpandido(true)}>
              <img src={lista[limite].poster} alt="" className={styles.posterFundo}/>
              <span className={styles.textoVerMais}>Ver mais</span>
            </button>
          )}

        </div>
          {expandido && (
            <div className={styles.verMenosWrapper}>
              <button className={styles.verMenos} onClick={() => setExpandido(false)}>Ver menos</button>
            </div>
          )}
    </div>
    </>
  );
}
