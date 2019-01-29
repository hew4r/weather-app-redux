import { createSelector } from 'reselect';
import toPairs from 'lodash.topairs';
import { SET_FORECAST_DATA, GET_WEATHER_CITY, SET_WEATHER_CITY } from "../actions";

//El state no se refiere al estado global sino a la porcion del estado
//esa porcion es cities
export const cities = (state = {}, action) => {
  switch (action.type) {
  
    case SET_FORECAST_DATA: {
      const { city, forecastData } = action.payload;
      //[city] clave del diccionario. [city]: { forecastData }
      return {...state, [city]: { ...state[city], forecastData, forecastDataDate: new Date() }};
    }
    case GET_WEATHER_CITY: {
      const city = action.payload;
      return { ...state, [city]: { ...state[city], weather: null }};
    }
    case SET_WEATHER_CITY: {
      const { city, weather } = action.payload;
      return { ...state, [city]: { ...state[city], weather }};
    }
      
    default:
      return state;
    
  }
  
}

//SELECTOR: buscamos la city en la porcion del state que es cities
export const getForecastDataFromCities =
  createSelector((state, city) => state[city] && state[city].forecastData, forecastData => forecastData);


//[key, value] la primera la considera key, la 2da el valor.
const fromObjToArray = cities => (toPairs(cities).map(([key, value]) => ({ key, name: key, data: value.weather })));
//El state es el state correpondiente a la cities
export const getWeatherCities =
  createSelector(state => fromObjToArray(state), cities => cities);