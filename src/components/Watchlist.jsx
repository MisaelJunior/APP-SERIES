import styles from "./Watchlist.module.css";

export default function Watchlist({titulo, subtitulo, lista}){
    return(
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.titulo}>{titulo}</h1>
                <span className={styles.subtitulo}>{subtitulo}</span>
            </div>
            <div className={styles.lista}>
               {lista.map((filme) => (
                    <div className={styles.item}>
                        <img src={filme.poster} alt={filme.titulo} className={styles.poster}/>

                        <div className={styles.info}>
                            <p className={styles.tituloFilme}>{filme.titulo}</p>
                            <p className={styles.detalhes}>{filme.diretor} - {filme.ano}</p>
                        </div>

                        <button className={styles.buttonInfo}>ⓘ</button>
                    </div>
               ))} 
            </div>
        </div>
        </>
    )
}