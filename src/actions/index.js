import getUrlForecastByCity from "../services/getUrlForecastByCity";
import transformForecast from "../services/transformForecast";

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

const setCity = payload => ({type: SET_CITY, payload});
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload })

export const setSelectedCity = payload => {
 
  return dispatch => {
  
    const api_forecast = getUrlForecastByCity(payload);
  
    // activar en el estado un indicador de busqueda de datos
    dispatch(setCity(payload));
    
    return fetch(api_forecast).then(resolve => {
      return resolve.json();
    }).then(data => {
   
      const forecastData = transformForecast(data);
      console.log(forecastData);
      
      // modificar el estado con el resultado de la promise (fetch)
      
      dispatch(setForecastData({city: payload, forecastData}));
    }).catch(err => {})
    
  };
};