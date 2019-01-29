import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//import { setSelectedCity, setWeather } from "../actions";
import * as actions from "../actions";
import { getWeatherCities, getCity } from '../reducers';
import { connect } from "react-redux";
import LocationList from "../components/LocationList";

class LocationListContainer extends Component {

    componentDidMount() {
        const { setWeather, setSelectedCity, cities, city } = this.props;
  
        setWeather(cities);
        setSelectedCity(city);
    }
    
    handleSelectedLocation = city => {
        this.props.setSelectedCity(city);
    }

    render() {
        return (
            <LocationList
                cities={this.props.citiesWeather}
                onSelectedLocation={this.handleSelectedLocation}
            />
        );
    }
}

LocationListContainer.propTypes = {
    setSelectedCity: PropTypes.func.isRequired,
    setWeather: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    citiesWeather: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired, //porque en el initialState le seteamos "Buenos Aires".
};

/* Version Anterior del bindActionCreators
const mapDispatchToProps = dispatch => ({
    setCity: payload => dispatch(setSelectedCity(payload)),
    setWeather: cities => dispatch(setWeather(cities))
});*/

//Version bindActionCreators: como dentro de actions ya esta setCity (habria que cambiarlo por setSelectedCity)
//y setWeather por exportacion te los trae
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  citiesWeather: getWeatherCities(state),
  city: getCity(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);
