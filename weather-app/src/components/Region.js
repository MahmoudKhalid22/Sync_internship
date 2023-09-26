import React, { useState } from "react";

function Region() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${region}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "240d799d49msh81a45f0f47e2386p1e50a6jsna95bcac30710",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );

      setLoading(false);
      const getData = await response.json();
      if (getData.error) {
        throw new Error(getData.error.error);
      }
      setData(getData);
      setErr(false);
      setRegion("");
      console.log(data);
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button>Get Weather</button>
      </form>
      {loading && <p className="loading">loading...</p>}
      {err && <p className="error">No Valid Data</p>}

      <div className="btns">
        <button
          id="location-button"
          className={count === 0 ? "active" : ""}
          onClick={() => setCount(0)}
        >
          Info
        </button>
        <button
          id="temperature-button"
          className={count === 1 ? "active" : ""}
          onClick={() => setCount(1)}
        >
          Weather
        </button>
      </div>
      {data ? (
        <div className="data">
          {count === 0 ? (
            <>
              <p>
                <span>Location : </span>
                {data.location?.name}
              </p>
              <p>
                <span>Region :</span> {data.location?.region}
              </p>
              <p>
                <span>Country :</span> {data.location?.country}
              </p>
              <p>
                <span>Latitude :</span> {data.location?.lat}
              </p>
              <p>
                <span>Logitude :</span> {data.location?.lon}
              </p>
              <p>
                <span>Continent :</span> {data.location?.tz_id}
              </p>
              <p>
                <span>Location Time :</span> {data.location?.localtime}
              </p>
            </>
          ) : (
            <>
              <p>
                <span>Temperature in C : </span> {data.current?.temp_c} ْ C{" "}
              </p>
              <p>
                <span>Temperature in F : </span> {data.current?.temp_f}
              </p>
              <p>
                <span>Humidity: </span> {data.current?.humidity}
              </p>

              <p>{data.current?.condition.text}</p>
              <div className="image">
                <img src={data.current?.condition.icon} alt="icon" />
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="no-data">No data</p>
      )}
    </div>
  );
}

export default Region;
