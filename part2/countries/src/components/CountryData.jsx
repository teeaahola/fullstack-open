import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)

  useEffect(() => {
    const [lat, lng] = country.capitalInfo.latlng
    weatherService
      .getWeather(lat, lng)
      .then(data => {
        console.log(data)
        setWeather(data)
        setIconUrl(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      })
      .catch(error => {
        console.log("Error fetching weather data:", error)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      Capital {country.capital.join(", ")}<br />
      Area {country.area}
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <div>Temperature: {weather && weather.main.temp} Celsius</div>
      <img src={weather && iconUrl} />
      <div>Wind: {weather && weather.wind.speed} m/s</div>
    </div>
  )
}

export default CountryData