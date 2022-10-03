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
            "Content-Type": "application/json",
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
        <tr>
          <th colSpan={2}>{apiData.ubi}</th>
        </tr>
        <tr>
          <th>Altitud</th>
          <td>{apiData.alt} m</td>
        </tr>
        <tr>
          <th>Precipitación última hora</th>
          <td>{apiData.prec} mm</td>
        </tr>
        <tr>
          <th>Velocidad del viento</th>
          <td>{apiData.vv} m/s</td>
        </tr>
        <tr>
          <th>Dirección del viento</th>
          <td>{apiData.dv}
          <sup>o</sup></td>
        </tr>
        <tr>
          <th>Temperatura del suelo</th>
          <td>{apiData.ts} <sup>o</sup>C</td>
        </tr>
        <tr>
          <th>Temperatura del aire</th>
          <td>{apiData.ta} <sup>o</sup>C</td>
        </tr>
      </table>
    </div>
  );
};

DataFetch.propTypes = {
  url: Proptypes.string,
};

export default DataFetch;
