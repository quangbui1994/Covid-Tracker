import React, { Component } from 'react';
import { Card, CountryPicker, Chart } from './component';
import styles from './App.module.css';
import { fetchData } from './api';
import Photo from './image.png';

class App extends Component {
  state = {
    data: {},
    country: ''
  } 

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  countryChangeHandler = async country => {
    const data = await fetchData(country);
    console.log(data);
    this.setState({ data, country });
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={Photo}/>
        <Card data={data}/>
        <CountryPicker countryChangeHandler={this.countryChangeHandler}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;