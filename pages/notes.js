import styles from "../styles/Notes.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Notes({ notesData }) {
  const [notesPeriode, setNotesPeriode] = useState(2);
  const [activeIndex, setActiveIndex] = useState(notesPeriode);

  function trimestreClick(number) {
    setNotesPeriode(number);
    setActiveIndex(number);
  }

  if (notesData) {
    return (
      <div className={`montserrat ${styles.notesApp}`}>
        <div className={styles.informations}>
          <span>
            Conseil de classe le {notesData.periodes[notesPeriode].dateConseil}{" "}
            à {notesData.periodes[notesPeriode].heureConseil}
          </span>
          <span>
            Moyennes calculées à{" "}
            {notesData.periodes[notesPeriode].ensembleMatieres.dateCalcul.slice(
              -5
            )}
          </span>
        </div>
        {notesData.periodes[notesPeriode].ensembleMatieres.disciplines.map(
          (item) => (
            <div className={styles.notes} key={item.discipline}>
              <div className={styles.notesContainer}>
                <h2 className={styles.matiere} key={item.discipline}>
                  {item.discipline}
                </h2>
                <span className={styles.moyenne}>
                  Moyenne:{" "}
                  <span className={styles.bold} key={item.moyenne}>
                    {item.moyenne}
                  </span>
                </span>
                <span className={styles.moyenne}>
                  Moyenne classe:{" "}
                  <span className={styles.bold} key={item.moyenneClasse}>
                    {item.moyenneClasse}
                  </span>
                </span>
                <span className={styles.moyenne}>
                  Moyenne classe min.:{" "}
                  <span className={styles.bold} key={item.moyenneMin}>
                    {item.moyenneMin}
                  </span>
                </span>
                <span className={styles.moyenne}>
                  Moyenne classe max.:{" "}
                  <span className={styles.bold} key={item.moyenneMax}>
                    {item.moyenneMax}
                  </span>
                </span>
              </div>
            </div>
          )
        )}
        <div className={styles.trimestres}>
          {notesData.periodes.map((item, index) => (
            <h2
              className={`${
                activeIndex === index ? styles.active : styles.inactive
              }`}
              key={index}
              onClick={() => trimestreClick(index)}
            >
              {item.periode}
            </h2>
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.moyennesUser}>
              <span className={styles.moyenne}>
                Moyenne générale:{" "}
                <span className={styles.bold}>
                  {
                    notesData.periodes[notesPeriode].ensembleMatieres
                      .moyenneGenerale
                  }
                </span>
              </span>
              <span className={styles.moyenne}>
                Moyenne de la classe:{" "}
                <span className={styles.bold}>
                  {
                    notesData.periodes[notesPeriode].ensembleMatieres
                      .moyenneClasse
                  }
                </span>
              </span>
            </div>
            <div className={styles.moyennesClasse}>
              <span className={styles.moyenne}>
                Moyenne classe min.:{" "}
                <span className={styles.bold}>
                  {notesData.periodes[notesPeriode].ensembleMatieres.moyenneMin}
                </span>
              </span>
              <span className={styles.moyenne}>
                Moyenne classe max.:{" "}
                <span className={styles.bold}>
                  {notesData.periodes[notesPeriode].ensembleMatieres.moyenneMax}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="center montserrat">
        <h1>Aucune donnée trouvée.</h1>
        <span className={styles.loggedIn}>
          Vous n&apos;êtes probablement pas connéctés.
        </span>
        <Link href="/">
          <a className="goBack">Retournez à la page de login</a>
        </Link>
      </div>
    );
  }
}
