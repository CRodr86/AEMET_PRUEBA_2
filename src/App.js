import { useEffect, useState } from "react";
import "./App.css";
import DataFetch from "./DataFetch";

export default function App() {
  const actualWeather = [
    "código",
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
    "código",
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

  let maxDate = new Date();                         
  maxDate.setDate(maxDate.getDate() - 4); 
  maxDate= maxDate.toISOString().split("T")[0];

  const [isLoading, setIsLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [idemaCode, setIdemaCode] = useState("7002Y");
  const [date, setDate] = useState(maxDate);
  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;

  const handleChange = (e) => {
    setIdemaCode(e.target.value);
    setIsLoading(true);
  };

  const handleDate = (e) => {
    e.preventDefault();
    setDate(e.target.value);
    setIsLoading(true);
  };



  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            `https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/${date}T00%3A00%3A00UTC/fechafin/${date}T23%3A59%3A59UTC/estacion/${idemaCode}?api_key=${API_KEY}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
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
  }, [isLoading, API_KEY, API_URL, idemaCode, date]);

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
      <form>
        <label htmlFor="idemaCode">Código IDEMA</label>
        <select id="idema" name="idema" onChange={(e) => handleChange(e)}>
          {especificDayWeather.map((i, key) => (
            <option value={i} key={key}>
              {i}
            </option>
          ))}
        </select>
        <label htmlFor="date">Fecha</label>
        <input type="date" min="2010-01-01" max={maxDate} onChange={(e) => handleDate(e)} />
      </form>
      <p>{idemaCode}</p>
      <p>{date}</p>
      <DataFetch url={dataUrl} />
    </div>
  );
}
