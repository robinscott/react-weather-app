import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Tile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            secondsElapsed: this.props.interval
        };
        this.tick = this.tick.bind(this);
    }

    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed - 1});
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        const {
            obj
        } = this.props;

        return(
            <div className="Flex-item">
                <div className="Tile">
                    <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
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
}

export default Tile;