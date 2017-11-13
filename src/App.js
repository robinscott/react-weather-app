import React, { Component } from 'react';
import Overlay from './Overlay';
import './App.css';

const icon_url = 'http://openweathermap.org/img/w/';
const suffix = '.png';

class App extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
        };
        this.updateDataArray = this.updateDataArray.bind(this);
    }

    updateDataArray(interval, result) {
        const name = result.name;
        const weather = result.weather[0];
        const iconSrc = icon_url + result.weather[0].icon + suffix;
        const temperature = (result.main.temp - 32) * 5 / 9;

        this.setState({
            data: [...this.state.data, {name, weather, iconSrc, temperature}]
        });
    }

    render() {
        const {
            data
        } = this.state;

        return (
            <section className="container">
                <div className="Flex-container">
                    {data &&
                        data.map((obj, index) =>
                            <div className="Flex-item">
                                <div className="Tile">
                                    <h3>{obj.name}</h3>
                                    <h2>{obj.weather.description}</h2>
                                    <img src={obj.iconSrc} width='100px' alt={obj.weather.description} />
                                    <p>{obj.temperature}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Overlay updateDataArray={this.updateDataArray} />
            </section>
        );
    }
}

export default App;