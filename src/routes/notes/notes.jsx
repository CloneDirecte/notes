import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notes } from "ed-notes";
import spinner from "../../spinner.svg";
import "./notes.css";

export default function Notes() {
  let location = useLocation();
  let navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [notesPeriode, setNotesPeriode] = useState(2);
  const [activeIndex, setActiveIndex] = useState(notesPeriode);
  const [notesData, setNotes] = useState();

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
    async function fetchData() {
      var edNotes = await notes(location.state.token, location.state.accountId);
      console.log(edNotes);
      setNotes(edNotes.data);
      setIsLoaded(true);
    }

    fetchData();
  }, [location.state]);

  function trimestreClick(number) {
    setNotesPeriode(number);
    setActiveIndex(number);
  }
  if (isLoaded) {
    return (
      <div className="montserrat notes-app">
        <div className="informations">
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
            <div className="notes">
              <div className="notes-container">
                <h2 className="matiere" key={item.discipline}>
                  {item.discipline}
                </h2>
                <span className="moyenne">
                  Moyenne:{" "}
                  <span className="bold" key={item.moyenne}>
                    {item.moyenne}
                  </span>
                </span>
                <span className="moyenne">
                  Moyenne classe:{" "}
                  <span className="bold" key={item.moyenneClasse}>
                    {item.moyenneClasse}
                  </span>
                </span>
                <span className="moyenne">
                  Moyenne classe min.:{" "}
                  <span className="bold" key={item.moyenneMin}>
                    {item.moyenneMin}
                  </span>
                </span>
                <span className="moyenne">
                  Moyenne classe max.:{" "}
                  <span className="bold" key={item.moyenneMax}>
                    {item.moyenneMax}
                  </span>
                </span>
              </div>
            </div>
          )
        )}
        <div className="trimestres">
          {notesData.periodes.map((item, index) => (
            <h2
              className={activeIndex === index ? "active" : "inactive"}
              key={index}
              onClick={() => trimestreClick(index)}
            >
              {item.periode}
            </h2>
          ))}
        </div>
        <div className="footer">
          <div className="footer-container">
            <div className="moyennes-user">
              <span className="moyenne">
                Moyenne générale:{" "}
                <span className="bold">
                  {
                    notesData.periodes[notesPeriode].ensembleMatieres
                      .moyenneGenerale
                  }
                </span>
              </span>
              <span className="moyenne">
                Moyenne de la classe:{" "}
                <span className="bold">
                  {
                    notesData.periodes[notesPeriode].ensembleMatieres
                      .moyenneClasse
                  }
                </span>
              </span>
            </div>
            <div className="moyennes-classe">
              <span className="moyenne">
                Moyenne classe min.:{" "}
                <span className="bold">
                  {notesData.periodes[notesPeriode].ensembleMatieres.moyenneMin}
                </span>
              </span>
              <span className="moyenne">
                Moyenne classe max.:{" "}
                <span className="bold">
                  {notesData.periodes[notesPeriode].ensembleMatieres.moyenneMax}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <img src={spinner} />;
  }
}
