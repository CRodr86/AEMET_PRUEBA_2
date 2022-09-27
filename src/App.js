import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/0016A?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2RyaWdvLmNhcnZhbGhvQGVsc2FtZXguY29tIiwianRpIjoiYzhjZjNiYTgtM2RkOS00N2VkLWE0NDYtY2EwOGU2NmU1YWViIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NjM4NDUwNjUsInVzZXJJZCI6ImM4Y2YzYmE4LTNkZDktNDdlZC1hNDQ2LWNhMDhlNjZlNWFlYiIsInJvbGUiOiIifQ.iOapwmp1NKUBS7PACOwk__W8GykN3REkMFBwj8Bu6rs"
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
  }, [isLoading]);
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