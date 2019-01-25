import { createSelector } from 'reselect';
import { SET_FORECAST_DATA } from "../actions";

//El state no se refiere al estado global sino a la porcion del estado
//esa porcion es cities
export const cities = (state = {}, action) => {
  switch (action.type) {
  
    case SET_FORECAST_DATA:
      const { city, forecastData } = action.payload;
      //[city] clave del diccionario. [city]: { forecastData }
      return {...state, [city]: { forecastData }};
      
    default:
      return state;
    
  }
  
}

//SELECTOR: buscamos la city en la porcion del state que es cities
export const getForecastDataFromCities =
  createSelector((state, city) => state[city] && state[city].forecastData, forecastData => forecastData);