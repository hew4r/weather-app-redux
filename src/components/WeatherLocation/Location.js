import React from 'react';
import './styles.css';

const Location = (props) => {
  //Destructuring
  const { city } = props;
  
 // const city = props.city;
  
  return (
    <div className="locationCont">
      <h1>{city}</h1>
    </div>
  )
};

export default Location;