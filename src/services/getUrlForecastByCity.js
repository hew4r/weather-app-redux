import {api_key, url_base_forecast} from "../constants/api_url";

const getUrlForecastByCity = city => {
  return `${url_base_forecast}?q=${city}&appid=${api_key}`
}

export default getUrlForecastByCity;

