import React from 'react';
var moment = require('moment');

const Day = ({ temperature }) => {
  let newDate = new Date();
  const weekday = temperature.dt * 1000
  newDate.setTime(weekday)

  return (
    <div className="col-lg-2">
      <div className="card">
        <h4 className="card-title">{moment(newDate).format('dddd')}</h4>
        <p className="text-muted">{moment(newDate).format('MMMM Do')}</p>
        <h5>{Math.round(temperature.main.temp)} °F</h5>
        <div className="card-body">
          <p className="card-text">{temperature.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

export default Day;