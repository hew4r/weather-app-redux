import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transformForecast from '../services/transformForecast';
import ForecastItem from '../components/ForecastItem';
import './styles.css';
import getUrlForecastByCity from '../services/getUrlForecastByCity';

/*
const days = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
];

const data = {
  temperature: 10,
  weatherState: 'normal',
  humidity: 10,
  wind: 'normal',
};
*/

class ForecastExtended extends Component {
  
  constructor(){

    super();
    this.state ={
      forecastData: null,
    };
  }
  
  componentDidMount() {
    this.updateCity(this.props.city);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city) {
      this.setState({ forecastData: null });
      this.updateCity(nextProps.city);
    }
  }
  
  updateCity = city => {
    const api_forecast = getUrlForecastByCity(city);
  
    fetch(api_forecast).then(resolve => {
      return resolve.json();
    }).then(data => {
      console.log(data);
      const forecastData = transformForecast(data);
      console.log(forecastData);
      this.setState({ forecastData })
    }).catch(err => {
    
    })
  }
  
  renderForecastItemDays(forecastData) {
    //return "Render Items";
    return forecastData.map(forecast => (
      <ForecastItem
        key={`${forecast.weekDay}${forecast.hour}`}
        weekDay={forecast.weekDay}
        hour={forecast.hour}
        data={forecast.data}/>
    ));
  }
  
  renderProgress() {
    return <h3>Cargando Pronostico extendido...</h3>;
  }
  
  render() {
    const { city } = this.props;
    const { forecastData } = this.state;
    
    return (
      <div>
        <h2 className='forecast-title'>Pronostico Extendido para {city}</h2>
        {forecastData ?
          this.renderForecastItemDays(forecastData) :
          this.renderProgress()
        }
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired,
}

export default ForecastExtended;