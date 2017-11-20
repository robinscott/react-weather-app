import React, { Component } from 'react';
import Overlay from './Overlay';
import Tile from './Tile';
import './App.css';

const icon_url = 'http://openweathermap.org/img/w/';
const suffix = '.png';
const url = 'http://api.openweathermap.org/data/2.5/weather';
const queryString = 'q=';
const keyQuery = 'APPID=';
const key = 'c1bbacb38ffa09548e071d66119cf44d';
const units = 'units=metric';

class App extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            interval: 0
        };
        this.updateDataArray = this.updateDataArray.bind(this);
    }

    updateDataArray(interval, result) {
        const name = result.name;
        const weather = result.weather[0];
        const iconSrc = icon_url + weather.icon + suffix;
        const conditions = { ...result.main, ...result.wind };

        this.setState({
            data: [...this.state.data, {name, weather, iconSrc, conditions}],
            interval
        });
    }

    fetchCityWeatherData(city) {
        return fetch(`${url}?${queryString}${city}&${units}&${keyQuery}${key}`)
            .then(response => response.json())
            .then(result => result )
            .catch(e => e);
    }

    render() {
        const {
            data,
            interval
        } = this.state;

        return (
            <section className="container">
                <div className="Flex-container">
                    {data &&
                        data.map((obj, index) =>
                            <Tile obj={obj} interval={interval} />
                        )
                    }
                </div>
                <Overlay updateDataArray={this.updateDataArray} fetchCityWeatherData={this.fetchCityWeatherData} />
            </section>
        );
    }
}

export default App;