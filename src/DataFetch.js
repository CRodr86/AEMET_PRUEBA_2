import Proptypes from "prop-types";
import { useEffect, useState } from "react";

const DataFetch = (props) => {
  const [apiData, setApiData] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${props.url}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setApiData(data[data.length-1]);
          console.log(data[0]);
          setError(null);
        } else {
          setError("Hubo un error al obtener la petición");
        }
      } catch (error) {
        setError("Datos no encontrados");
      }
    }
    fetchData();
  }, [props.url]);

  if (error) {
    return (
      <div className="DataFetch">
        <h1>{error}</h1>
      </div>
    );
  }
  return (
    <div className="DataFetch">
      <ul>
        <li>Ubicación: {apiData.ubi}</li>
        <li>Altitud: {apiData.alt} m</li>
        <li>Precipitación última hora: {apiData.prec} mm</li>
        <li>Velocidad del viento: {apiData.vv} m/s</li>
        <li>Dirección del viento: {apiData.dv}<sup>o</sup></li>
        <li>Temperatura del suelo: {apiData.ts} <sup>o</sup>C</li>
        <li>Temperatura del aire: {apiData.ta} <sup>o</sup>C</li>        
      </ul>
    </div>
  )
};

DataFetch.propTypes = {
    url: Proptypes.string
};

export default DataFetch;