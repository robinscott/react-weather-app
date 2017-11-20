import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

class Overlay extends Component {

    constructor() {
        super();

        this.state = {
            showModal: false,
            city: '',
            interval: 300,
            showErrorMessage: false
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    close() {
        this.setState({ showModal: false, showErrorMessage: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleChange(property) {
        return event => {
            property !== "interval" ? this.setState({ [property]: event.target.value }) : this.setState({ [property]: parseInt(event.target.value, 10) })
        }
    }

    handleClick() {
        const { interval, city } = this.state;

        this.props.fetchCityWeatherData(city).then(data => {
            if(data.cod && data.message) {
                this.setState({ showErrorMessage: true })
            } else {
                this.props.updateDataArray(interval, data);
                this.close();
            }
        });
    }

    render() {

        const {
            showModal,
            city,
            showErrorMessage
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
                            {showErrorMessage &&
                                <Alert bsStyle="warning">
                                    Unfortunately we haven't found this city. Please try another name.
                                </Alert>
                            }

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
                                        value={this.state.interval}
                                        onChange={this.handleChange("interval")} >
                                    <option value="300">5 minutes</option>
                                    <option value="600">10 minutes</option>
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
