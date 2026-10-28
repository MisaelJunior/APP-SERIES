import styles from "./Perfil.module.css";
import Banner from "../../assets/banner.png";
import FotoPerfil from "../../assets/fotoPerfil.png";
import { useState, type ReactElement } from "react";
import GridFilmes from "../../components/GridFilmes";
import { todosOsFilmes } from "../../data/filmesMock";
import Watchlist from "../../components/Watchlist";
import Reviews from "../../components/Reviews";
import Navbar from "../../components/Navbar";

type AbaProfile = "Movies" | "Favorites" | "Watchlist" | "Ratings";

function Profile() {
  const filmesFavoritos = todosOsFilmes.filter((filme) => filme.favorito);
  const todosOsFilmesAssistidos = todosOsFilmes.filter((filme) => filme.watched);
  const filmesNaWatchlist = todosOsFilmes.filter((filme) => filme.naWatchlist);
  const filmesAvaliados = todosOsFilmes.filter((filme) => filme.avaliacoes.length > 0);
  const [abaAtiva, setAbaAtiva] = useState<AbaProfile>("Movies");
  const conteudoPorAba: Record<AbaProfile, ReactElement> = {
    Movies: (
      <GridFilmes
        key="movies"
        titulo="Todos os Filmes"
        subtitulo={`${todosOsFilmesAssistidos.length} filmes assistidos`}
        lista={todosOsFilmesAssistidos}
      />
    ),
    Favorites: (
      <GridFilmes
        key="favorites"
        titulo="Filmes Favoritos"
        subtitulo="os que ficam pra sempre"
        lista={filmesFavoritos}
      />
    ),
    Watchlist: (
      <Watchlist
        key="watchlist"
        titulo="Quero assistir"
        subtitulo={`${filmesNaWatchlist.length} filmes na fila`}
        lista={filmesNaWatchlist}
      />
    ),
    Ratings: (
      <Reviews
        key="ratings"
        titulo="Minhas Avaliações"
        subtitulo={`${filmesAvaliados.length} filmes avaliados`}
        lista={filmesAvaliados}
      />
    ),
  };

  return (
    <>
      <Navbar />
      <div className={styles.bodyProfile}>
        <div className={styles.profileHeader}>
          <img className={styles["banner-img"]} src={Banner} alt="Banner" />
          <img
            className={styles["profilePic-img"]}
            src={FotoPerfil}
            alt="Profile Picture"
          />
          <h1 className={styles["profileName"]}>Jubileu</h1>
          <h2 className={styles["profileInfo"]}>
            @jubileu_esquisito · member since July 2026
          </h2>
          <p className={styles["profileDescription"]}>
            Gosto de filmes de ação, jubileu está esquisito hoje :)
          </p>
          <button className={styles["profileEditButton"]}>Edit Profile</button>
        </div>
        <div className={styles.content}>
          <div className={styles.stat}>
            <h1>{todosOsFilmesAssistidos.length}</h1>
            <h2>MOVIES</h2>
          </div>
          <div className={styles.stat}>
            <h1>15</h1>
            <h2>THIS YEAR</h2>
          </div>
          <div className={styles.stat}>
            <h1>7</h1>
            <h2>RATINGS</h2>
          </div>
          <div className={styles.stat}>
            <h1>0</h1>
            <h2>FOLLOWERS</h2>
          </div>
          <div className={styles.stat}>
            <h1>0</h1>
            <h2>FOLLOWING</h2>
          </div>
        </div>
        <nav className={styles.navMenu}>
          <ul className={styles.ulNavMenu}>
            <li className={abaAtiva === "Movies" ? styles.ativo : ""} onClick={() => setAbaAtiva("Movies")}>Movies <span className={styles.spanMenu}>{todosOsFilmesAssistidos.length}</span></li>
            <li className={abaAtiva === "Favorites" ? styles.ativo : ""} onClick={() => setAbaAtiva("Favorites")}>Favorites <span className={styles.spanMenu}>{filmesFavoritos.length}</span></li>
            <li className={abaAtiva === "Watchlist" ? styles.ativo : ""} onClick={() => setAbaAtiva("Watchlist")}>Watchlist <span className={styles.spanMenu}>{filmesNaWatchlist.length}</span></li>
            <li className={abaAtiva === "Ratings" ? styles.ativo : ""} onClick={() => setAbaAtiva("Ratings")}>Ratings <span className={styles.spanMenu}>7</span></li>
          </ul>
        </nav>
        <div>
          {conteudoPorAba[abaAtiva]}
        </div>
      </div>
    </>
  );
}

export default Profile;
