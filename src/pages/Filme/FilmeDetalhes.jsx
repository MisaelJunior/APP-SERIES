import styles from "./FilmeDetalhes.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { todosOsFilmes } from "../../data/filmesMock";
import { useState } from "react";

export default function FilmeDetalhes() {
  const [abaAtiva, setAbaAtiva] = useState("Populares");
  const comentariosPopulares = todosOsFilmes;
  const { id } = useParams();
  const navigate = useNavigate();
  const filme = todosOsFilmes.find((filme) => filme.id === Number(id));
    if (!filme) {
        return <p>Filme não encontrado.</p>;
    }
  const conteudoPorAba = {
      Populares: (
        <Comments
          key="populares"
          titulo="Comentários Populares"
          lista={comentariosPopulares}
        />
      ),
      Recentes: (
        <Comments
          key="recent"
          titulo="Comentários Recentes"
          lista={comentariosRecentes}
        />
      ),
  };
  return (
    <>
    <div className={styles.pagina}>
        <div className={styles.header}>
        <button className={styles.voltar} onClick={() => navigate(-1)}>← Voltar</button>
        <span className={styles.tituloHeader}>{filme.titulo} · {filme.ano}</span>
        </div>
        <div className={styles.banner}>
            <img src={filme.poster} alt="" className={styles.bannerImagem} />
            <div className={styles.bannerGradiente}></div>

            <div className={styles.conteudoPrincipal}>
                <img src={filme.poster} alt={filme.titulo} className={styles.poster} />
                <div className={styles.infoFilme}>
                    <div className={styles.generos}>
                        {filme.generos.map((genero) => (
                            <span key={genero} className={styles.badge}>{genero}</span>
                        ))}
                    </div>

                    <h1 className={styles.titulo}>{filme.titulo}</h1>

                    <p className={styles.dados}>
                        {filme.ano} · {filme.duracao} · {filme.diretor} ·{" "}
                        <span className={styles.nota}>★ {filme.notaMedia}</span>{" "}
                        ({filme.totalAvaliacoes} avaliações)
                    </p>

                    <p className={styles.sinopse}>{filme.sinopse}</p>

                </div>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.campoAvaliacoes}>
                <div className={styles.avaliar}></div>
                <div className={styles.avaliacoes}></div>
            </div>
            <div className={styles.conteudo}>
                <div className={styles.comentarios}>
                    <nav className={styles.navMenu}>
                        <ul className={styles.ulNavMenu}>
                        <li className={abaAtiva === "Populares" ? styles.ativo : ""} onClick={() => setAbaAtiva("Populares")}>Populares</li>
                        <li className={abaAtiva === "Recentes" ? styles.ativo : ""} onClick={() => setAbaAtiva("Recentes")}>Recentes</li>
                        </ul>
                    </nav>
                    conteudoPorAba[abaAtiva];
                </div>
                <div className={styles.dadosFilme}>
                    <div className={styles.cast}></div>
                    <div className={styles.fichaTecnica}></div>
                </div>
            </div>
        </div>                
    </div>
    </>
  );
}