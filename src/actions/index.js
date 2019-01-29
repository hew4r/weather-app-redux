import getUrlForecastByCity from "../services/getUrlForecastByCity";
import getUrlWeatherByCity from "../services/getUrlWeatherByCity";
import transformForecast from "../services/transformForecast";
import transformWeather from "../services/transformWeather";

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';


//Actions Creator
const setCity = payload => ({type: SET_CITY, payload});
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload });

const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload});
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload});

export const setSelectedCity = payload => {
 
  return (dispatch, getState) => {
  
    const api_forecast = getUrlForecastByCity(payload);
  
    // activar en el estado un indicador de busqueda de datos
    dispatch(setCity(payload));
    
    /*inicio - validacion para que no vuelva a hacer un fetch si este ya lo hizo hace menos de 1 min*/
    const state = getState();
    const date = state.cities[payload] && state.cities[payload].forecastDataDate;
    
    const now = new Date();
    
    if (date && (now - date) < 1 * 60 * 1000) {
      return;
    }
    /*fin - */
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

export const setWeather = payload => {
  
  return dispatch => {
  
    payload.forEach(city => {
  
      dispatch(getWeatherCity(city));
      
      const api_weather = getUrlWeatherByCity(city);
  
      fetch(api_weather).then(resolve => {
    
        return resolve.json(); //devuelve otra promesa
      }).then(weather_data => {
        
        const weather = transformWeather(weather_data);
      
        dispatch(setWeatherCity({ city, weather }))
        
     
      });
    
    
    });
    
    
    
    
    
    
  }

};