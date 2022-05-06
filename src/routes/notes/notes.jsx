import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import spinner from "../../spinner.svg";
import "./notes.css";

export default function Notes() {
  let location = useLocation();
  let navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [notesPeriode, setNotesPeriode] = useState(2);
  const [activeIndex, setActiveIndex] = useState(notesPeriode);
  const [notes, setNotes] = useState();

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
    var data = `data={\n\t"token": "${location.state.token}"\n}`;

    var config = {
      method: "post",
      url: `https://api.ecoledirecte.com/v3/eleves/${location.state.accountId}/notes.awp?verbe=get`,
      headers: {},
      data: data,
    };

    async function fetchData() {
      await axios(config).then((res) => {
        console.log(res);
        setNotes(res.data.data);
        setIsLoaded(true);
      });
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
            Conseil de classe le {notes.periodes[notesPeriode].dateConseil} à{" "}
            {notes.periodes[notesPeriode].heureConseil}
          </span>
          <span>
            Moyennes calculées à{" "}
            {notes.periodes[notesPeriode].ensembleMatieres.dateCalcul.slice(-5)}
          </span>
        </div>
        {notes.periodes[notesPeriode].ensembleMatieres.disciplines.map(
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
          {notes.periodes.map((item, index) => (
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
                    notes.periodes[notesPeriode].ensembleMatieres
                      .moyenneGenerale
                  }
                </span>
              </span>
              <span className="moyenne">
                Moyenne de la classe:{" "}
                <span className="bold">
                  {notes.periodes[notesPeriode].ensembleMatieres.moyenneClasse}
                </span>
              </span>
            </div>
            <div className="moyennes-classe">
              <span className="moyenne">
                Moyenne classe min.:{" "}
                <span className="bold">
                  {notes.periodes[notesPeriode].ensembleMatieres.moyenneMin}
                </span>
              </span>
              <span className="moyenne">
                Moyenne classe max.:{" "}
                <span className="bold">
                  {notes.periodes[notesPeriode].ensembleMatieres.moyenneMax}
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
