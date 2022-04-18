import Axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

const API_KEY = "424aebafb6d2822e62e616b572819112";
export const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  '01n': '/icons/night.svg',
  '02d': '/icons/day.svg',
  '02n': '/icons/cloudy-night.svg',
  '03d': '/icons/cloudy.svg',
  '03n': '/icons/cloudy.svg',
  '04d': '/icons/perfect-day.svg',
  '04n': '/icons/cloudy-night.svg',
  '09d': '/icons/rain.svg',
  '09n': '/icons/rain-night.svg',
  '10d': '/icons/rain.svg',
  '10n': '/icons/rain-night.svg',
  '11d': '/icons/thunder.svg',
  '11n': '/icons/thunder.svg',
  '13d': '/icons/snow.svg',
  '13n': '/icons/snow.svg',
  '50d': '/icons/fog.svg',
  '50n': '/icons/fog.svg',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [error, setError] = useState(null);



  const fetchWeather = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (city) {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
        .then((res) => {
          updateWeather(res.data);
          setError(null);
        })
        .catch((err) => {
          setError("City not found");
        });
    }
  }

  return (
    <Container>
      <AppLabel>Weather App</AppLabel>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
      {error && <p>{error}</p>}
    </Container>
  );
}
export default App;
