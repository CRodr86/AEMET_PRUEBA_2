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
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "cache-control": "no-cache",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setApiData(data[data.length - 1]);
          console.log(data[0]);
          setError(null);
        } else {
          setError("Hubo un error al obtener la petición");
        }
      } catch (error) {
        setError("Insertar código");
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
      <table border={1} width="320px">
        <thead>
          <tr>
            <th colSpan={2}>{apiData.nombre}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Altitud</th>
            <td>{apiData.altitud ? `${apiData.altitud} m` : `-`}</td>
          </tr>
          <tr>
            <th>Precipitación diaria</th>
            <td>{apiData.prec || apiData.prec === 0 ? `${apiData.prec} mm` : `-`}</td>
          </tr>
          <tr>
            <th>Velocidad media del viento</th>
            <td>{apiData.velmedia ? `${apiData.velmedia} m/s` : `-`}</td>
          </tr>
          <tr>
            <th>Racha máxima del viento</th>
            <td>{apiData.racha ? `${apiData.racha} m/s` : `-`}</td>
          </tr>
          <tr>
            <th>Temperatura mínima</th>
            {apiData.tmin ? <td>{apiData.tmin}<sup>o</sup>C</td> : <td>-</td>}
          </tr>
          <tr>
            <th>Temperatura máxima</th>
            {apiData.tmax ? <td>{apiData.tmax}<sup>o</sup>C</td> : <td>-</td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

DataFetch.propTypes = {
  url: Proptypes.string,
};

export default DataFetch;
