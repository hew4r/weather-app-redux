import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {setCity} from "../actions";
import { connect } from "react-redux";
import LocationList from "../components/LocationList";

class LocationListContainer extends Component {

    handleSelectedLocation = city => {
        this.props.setCity(city);
    }

    render() {
        return (
            <LocationList
                cities={this.props.cities}
                onSelectedLocation={this.handleSelectedLocation}
            />
        );
    }
}

LocationListContainer.propTypes = {
    setCity: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => ({
    setCity: payload => dispatch(setCity(payload))
});

export default connect(null, mapDispatchToProps)(LocationListContainer);
