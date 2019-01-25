import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCity, getForecastDataFromCities } from './../reducers';
import ForecastExtended from "../components/ForecastExtended";

class ForecastExtendedContainer extends Component {
    render() {
        const { city, forecastData } = this.props;
        return (
            city &&
            <ForecastExtended
              city={city}
              cities={forecastData}/>
        );
    }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string.isRequired,
    forecastData: PropTypes.array.isRequired,
};

//const mapStateToProps = state => ({ city: state.city})

const mapStateToProps = state => ({ city: getCity(state), forecastData: getForecastDataFromCities(state) }); //con destructuring. city seria this.props.city

export default connect(mapStateToProps, null) (ForecastExtendedContainer);