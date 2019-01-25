import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForecastExtended from "../components/ForecastExtended";

class ForecastExtendedContainer extends Component {
    render() {
        return (
            this.props.city &&
            <ForecastExtended city={this.props.city}/>
        );
    }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string.isRequired,
};

//const mapStateToProps = state => ({ city: state.city})

const mapStateToProps = ({ city }) => ({ city }) //con destructuring. city seria this.props.city

export default connect(mapStateToProps, null) (ForecastExtendedContainer);