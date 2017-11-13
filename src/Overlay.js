import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

const url = 'http://api.openweathermap.org/data/2.5/weather';
const queryString = 'q=';
const keyQuery = 'APPID=';
const key = 'c1bbacb38ffa09548e071d66119cf44d';

class Overlay extends Component {

    constructor() {
        super();

        this.state = {
            showModal: false,
            city: '',
            interval: ''
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleChange(property) {
        return event => {
            this.setState({ [property]: event.target.value })
        }
    }

    handleClick() {
        const { city, interval } = this.state;

        fetch(`${url}?${queryString}${city}&${keyQuery}${key}`)
            .then(response => response.json())
            .then(result => this.props.updateDataArray(interval, result))
            .catch(e => e);

        this.close();
    }

    render() {

        const {
            showModal,
            city
        } = this.state;

        return (
            <div>

                <Button bsStyle="primary" onClick={this.open}>
                    Add a city
                </Button>

                <Modal show={showModal} onHide={this.close}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add a city to your weather tiles</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>

                            <FieldGroup
                                id="cityName"
                                type="text"
                                label="City name"
                                value={city}
                                onChange={this.handleChange("city")}
                            />

                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Refresh interval</ControlLabel>
                                <FormControl
                                        componentClass="select"
                                        placeholder="select"
                                        onChange={this.handleChange("interval")} >
                                    <option value="1">1 minute</option>
                                    <option value="2">2 minutes</option>
                                </FormControl>
                            </FormGroup>

                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.close}>
                            Cancel
                        </Button>
                        <Button bsStyle="primary" onClick={this.handleClick}>
                            Add city
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }

}

export default Overlay;
