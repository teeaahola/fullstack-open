import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/2.5/"
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (lat, lng) => {
  const url = `${baseUrl}weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
  return axios.get(url).then(response => response.data)
}

export default { getWeather }