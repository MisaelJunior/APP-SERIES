import styles from "./style.module.css";
import Logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";

function Register() {
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
                <li><Link to="/">Log In</Link></li>
                <li><Link to="/">About us</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
        <div className={styles.container}>
            <form>
                <h2>Register</h2>
                <div className={styles.password}>
                  <input type="text" name="name" placeholder="Name"></input>
                </div>
                <div className={styles.password}>
                  <input type="email" name="email" placeholder="Email"></input>
                </div>
                <div className={styles.password}>
                  <input type="password" name="password" placeholder="Password"></input>
                </div>
                <div className={styles.password}>
                  <input type="password" name="confirmPassword" placeholder="Confirm Password"></input>
                </div>
                <button type="button">Register</button>
            </form>
        </div>
        <div className={styles.noRegister}>
        <p>Already have an account?</p>
        <Link to="/">Login</Link>
      </div>
    </>
  );
}

export default Register;
