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
        <p>{apiData.ubi}</p>
    </div>
  )
};

DataFetch.propTypes = {
    url: Proptypes.string
};

export default DataFetch;