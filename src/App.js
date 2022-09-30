import { useEffect, useState } from "react";
import "./App.css";
import DataFetch from "./DataFetch";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [idema, setIdema] = useState("");
  const [idemaCode, setIdemaCode] = useState("");
  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;

  const actualWeather = [
    "7002Y",
    "7012C",
    "7023X",
    "7026X",
    "7031X",
    "7066Y",
    "7072Y",
    "7080X",
    "7096B",
    "7103Y",
    "7119B",
    "7121A",
    "7127X",
    "7138B",
    "7145D",
    "7158X",
    "7172X",
    "7178I",
    "7195X",
    "7203A",
    "7209",
    "7211B",
    "7227X",
    "7237E",
    "7244X",
    "7247X",
    "7250C",
    "7261X",
    "7275C",
  ];

  const especificDayWeather = [
    "7002Y",
    "7012C",
    "7031",
    "7031X",
    "7096B",
    "7119B",
    "7145D",
    "7178I",
    "7209",
    "7228",
    "7247X",
    "7275C",
  ];

  const submitHandler = () => {
    setIdemaCode(`${idema}`);
    setIdema("");
    setIsLoading(true);
  };

  const changeHandler = (e) => {
    setIdema(e.target.value);
  };

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            `${API_URL}${idemaCode}?api_key=${API_KEY}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setDataUrl(data.datos);
            setError(null);
            setIsLoading(false);
          } else {
            setError("Hubo un error al obtener la petición");
          }
        } catch (error) {
          setError("Datos no encontrados");
        }
      }
      fetchData();
    }
  }, [isLoading, API_KEY, API_URL, idemaCode]);

  if (error) {
    return (
      <div className="App">
        <h1>{error}</h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label htmlFor="idemaCode">Código IDEMA</label>
        <input
          type="text"
          id="idema"
          value={idema}
          onChange={changeHandler}
          autofocus="true"
        />
        <button type="submit">Buscar</button>
      </form>
      <p>{idemaCode}</p>
      <DataFetch url={dataUrl} />
    </div>
  );
}
