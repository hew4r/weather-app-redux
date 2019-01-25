import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { city } from './city'
import { cities, getForecastDataFromCities as _getForecastDataFromCities } from './cities'
//el alias permite reutilizar el nombre en otra llamada

export default combineReducers({
  cities,
  city
})

//con este alias _getForecastDataFromCities logramos llamar
//desde donde querramos a la funcion original _getForecastDataFromCities


//Selector
export const getCity = createSelector(state => state.city, city => city);

//Selector
export const getForecastDataFromCities = createSelector(state => state.cities, getCity, _getForecastDataFromCities);
