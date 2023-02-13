import React, { Component } from 'react';
import TransportDatePicker from "./TransportDatePicker";

class TransportOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: "Kartuzy",
            to: "Katowice",
            date: "2021-11-17",
            airplane: "Airbus A380",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    From
                    <input
                        name="from"
                        type="text"
                        value={this.state.from}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    To
                    <input
                        name="to"
                        type="text"
                        value={this.state.to}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    <TransportDatePicker name="date" value={this.state.date} onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Airplane
                    <input
                        name="airplane"
                        type="text"
                        value={this.state.airplane}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <input type="submit" value="send" />
            </form>
        );
    }
}

export default TransportOrder;