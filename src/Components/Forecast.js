import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Forecast.css";
export default function Forecast() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("London");

  const items = [
    {
      label: "London",
      value: "London",
    },
    {
      label: "Montreal",
      value: "Montreal",
    },
    {
      label: "Toronto",
      value: "Toronto",
    },
    {
      label: "Vancouver",
      value: "Vancouver",
    },
    {
      label: "Windsor",
      value: "Windsor",
    },
  ];

  useEffect(
    (e) => {
      const getData = async (e) => {
        console.log(city);
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
        );
        setData(result.data);
      };
      getData();
    },
    [city]
  );
  return (
    <div className="search">
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className="bold"> {data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p className="bold">{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
