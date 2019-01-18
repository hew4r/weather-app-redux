import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LocationList from "./components/LocationList";
import './App.css';
import ForecastExtended from "./components/ForecastExtended";

const cities = [
  'Buenos Aires,ar',
  'Washington,us',
  'Bogota,col',
  'Ciudad de México,mx',
  'Madrid,es',
  'Lima,pe',
];

class App extends Component {
  
  constructor(){
    super();
    this.state = { city: null, }
  }
  
  handleSelectedLocation = city => {
    console.log(`handleSelectedLocation ${city}`);
    this.setState({ city })
    
  }
  
  render() {
    
    const { city } = this.state;
    console.log(`render ${city}`);
    return (
      <Grid>
        <Row>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant='title' color='inherit'>
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
  
            <LocationList
              cities={cities}
              onSelectedLocation={this.handleSelectedLocation}
            />
            
          </Col>
          <Col xs={12} sm={6}>
            <Paper elevation={4}>
              <div className="detail">
                {
                  city && <ForecastExtended city={city}/>
                }
                  </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
