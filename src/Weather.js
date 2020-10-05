import React from 'react';
import config from './config';
import Day from './Day';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullData: [],
      dailyData: [],
      city: 'Austin'
    };
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData() {
    // fetch data from api
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=imperial&appid=${config.key}`;

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("21:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      })
    })
  }

  displayDays = () => {
    return this.state.dailyData.map((temperature, index) => <Day temperature={temperature} key={index} />)
  }

  updateCity = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  keyPressed = (event) => {
    if (event.key === 'Enter') {
      this.fetchData();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="main-heading"> 5-Day Weather Forecast</h1>
        <h2 className="city-name">{this.state.city}</h2>
        <div className="input-box">
          <input type="text" className="form-control"  defaultValue={this.state.city} onChange={this.updateCity} 
               onKeyPress={this.keyPressed}/>
        </div>
        <div className="row justify-content-center">
          {this.displayDays()}
        </div>
      </div>
    )
  }
}

export default Weather;