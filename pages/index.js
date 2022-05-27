import styles from "../styles/Login.module.css";
import { useState } from "react";
import { login, notes } from "ed-notes";
import Router from "next/router";

export default function Home({
  username,
  setUsername,
  password,
  setPassword,
  setNotesData,
}) {
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(true);

  async function loginButton() {
    setIsLoaded(false);
    var edLogin = await login(username, password);
    console.log(edLogin);
    if (typeof edLogin !== "object") {
      setError(edLogin);
    } else {
      var edNotes = await notes(edLogin.token, edLogin.data.accounts[0].id);
      setIsLoaded(true);
      console.log(edNotes);
      setNotesData(edNotes.data);
      Router.push("/notes");
    }
  }

  function buttonDisabler() {
    if (!username || !password) {
      return (
        <button className={styles.loginButton} disabled>
          Login
        </button>
      );
    } else {
      return (
        <button className={styles.loginButton} onClick={loginButton}>
          Login
        </button>
      );
    }
  }

  return (
    <div className="center">
      <div className={`${styles.login} montserrat`}>
        <div className={`${styles.loginInside}`}>
          <h1 className={`${styles.title}`}>CloneDirecte</h1>
          <input
            className={`${styles.username} ${styles.inputs}`}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={`${styles.password} ${styles.inputs}`}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.error}>{error}</span>
          {buttonDisabler()}
        </div>
      </div>
      <div className={`montserrat ${styles.footerLogin}`}>
        <p>
          <a
            className={styles.links}
            href="https://github.com/CloneDirecte/notes"
          >
            👨‍💻 Code disponible en open-source sur GitHub
          </a>
        </p>
        <p>
          Nouveau projet:{" "}
          <a
            className={styles.links}
            href="https://github.com/CloneDirecte/notes-telegram-bot"
          >
            📨 un bot telegram qui vous informe de vos nouvelles notes
          </a>
        </p>
      </div>
    </div>
  );
}
