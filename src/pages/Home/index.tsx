import styles from "./style.module.css";
import Logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [visivel, setVisivel] = useState(false);
  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img className={styles["logo-img"]} src={Logo} alt="Logo" />
            <h1>AppSeries</h1>
          </div>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Main</Link></li>
                <li><Link to="/register">SignUp</Link></li>
                <li><Link to="/">About us</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <form>
          <h2>Login</h2>
          <div className={styles.password}>  
            <input type="email" name="email" placeholder="Email"></input>
          </div>  
          <div className={styles.password}>
            <input type={visivel ? "text" : "password"} placeholder="Password"/>
            <button type="button" onClick={() => setVisivel(!visivel)}>{visivel ? "🙈" : "👁️"}</button>
          </div>
          <button type="button">Enter</button>
        </form>
      </div>
      <div className={styles.noRegister}>
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
}

export default Home;
