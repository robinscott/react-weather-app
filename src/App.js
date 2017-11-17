import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
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
        const iconSrc = icon_url + weather.icon + suffix;
        const conditions = { ...result.main, ...result.wind };

        this.setState({
            data: [...this.state.data, {name, weather, iconSrc, conditions}]
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
                                    <ListGroup>
                                        <ListGroupItem><strong>Temperature:</strong> {obj.conditions.temp}&#8451;</ListGroupItem>
                                        <ListGroupItem><strong>Humidity:</strong> {obj.conditions.humidity}%</ListGroupItem>
                                        <ListGroupItem><strong>Wind speed:</strong> {obj.conditions.speed}m/s</ListGroupItem>
                                    </ListGroup>
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