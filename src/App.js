import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);

  const API_URL =`${process.env.REACT_APP_API_URL}`;
  const API_KEY =`${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            `${API_URL}0016A?api_key=${API_KEY}`, {
              method: 'GET',
              headers: { "Content-Type": "application/json"}
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
          setError("No pudimos hacer la solicitud para obtener los datos");
        }
      }
      fetchData();
    }
  }, [isLoading, API_KEY, API_URL]);


  const refreshData = () => {
    setIsLoading(true);
  };


  if (error) {
    return (
      <div className="App">
        <h1>{error}</h1>
        <button onClick={refreshData}>Volver a intentarlo</button>
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
      <p>{dataUrl}</p>
      <button onClick={refreshData}>
        Refrescar
      </button>
    </div>
  );
}