import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import FotoPerfil from "../assets/fotoPerfil.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  return (
    <header className={styles.navbar}>
      <div className={styles.conteudo}>
        <NavLink to="/" className={styles.logo}>
          cine<span className={styles.logoDestaque}>frame</span>
        </NavLink>

        <nav className={styles.links}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.ativo}` : styles.link
            }
          >
            Início
          </NavLink>
          {/* trocar por <NavLink to="/filmes"> quando a rota existir */}
          <span className={`${styles.link} ${styles.desabilitado}`} aria-disabled="true">
            Filmes
          </span>
        </nav>

        <label className={styles.busca}>
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Buscar filmes, pessoas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </label>

        <div className={styles.acoes}>
          <button className={styles.sino} aria-label="Notificações">
            🔔
            <span className={styles.pontoNotificacao}></span>
          </button>
          <button
            className={styles.avatarBotao}
            onClick={() => navigate("/profile")}
            aria-label="Ir para o perfil"
          >
            <img src={FotoPerfil} alt="Seu perfil" className={styles.avatar} />
          </button>
        </div>
      </div>
    </header>
  );
}
