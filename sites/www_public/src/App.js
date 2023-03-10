import React, {Component, useState} from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import OrderForm from "./components/OrderForm";
import DropZone from "./components/DropZone";
import Logo from "./components/Logo";
import Items from "./components/Items";
import { withSnackbar } from 'notistack';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            airplanes: [],
            totalCargoWeightAllowed: 0,
            currentCargoWeight: 2,
            items: []
        };

        this.handleSubmit =this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost/api/airplanes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    airplanes: data.data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    setTotalCargoWeightAllowed = (payload) => {
        this.setState({totalCargoWeightAllowed: payload});
    }

    handleSubmit(event) {
        event.preventDefault();

        var totalCargo = 0;
        var m;
        var items = [];

        const formData = new FormData(event.currentTarget);
        const tmpFormData = new FormData();

        let requestBody = {
            "from": '',
            "to": '',
            "date": '',
            "airplane": '',
            "items": []
        }

        formData.forEach((value, property) => {
            if(property == 'airplane') {
                requestBody[property] = this.state.airplanes[value].name;
            } else {
                m = [];
                m = property.match(/item\[(?<id>\d)](?<val>.*)/);
                if(m) {
                    if(requestBody.items[m[1]] === undefined) {
                        requestBody.items[m[1]] = {}
                    }
                    Object.assign(requestBody.items[m[1]],{[m[2]]: value})
                    if(m[2] === 'weight') {
                        totalCargo = totalCargo + parseFloat(value);
                    }
                } else {
                    requestBody[property] = value;
                }

            }
        });

        console.log(this.state.totalCargoWeightAllowed, totalCargo);
        if(totalCargo > this.state.totalCargoWeightAllowed) {
            this.props.enqueueSnackbar('Too much cargo! Reduce items!.', {variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top' }});
            return;
        }

        requestBody.items = requestBody.items.filter(n => n);
        console.log('rB end', requestBody.items);
        var emptyFormData = new FormData();
        var file = document.querySelector('input[type="file"]');

        fetch("http://localhost/api/transports",
            {
                body: JSON.stringify(requestBody),
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.props.enqueueSnackbar('Transport order send!.', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top' }});
            })
            .catch((error) => {
                this.props.enqueueSnackbar('Something went wrong!.', {variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top' }});
                console.error('Error:', error);
            });
    }

  render() {
    return (

            <form onSubmit={this.handleSubmit}>
              <div className="App">
                  <Grid2 container spacing={0.5}>
                      <Grid2 xs={6}>
                          <Logo />
                      </Grid2>
                      <Grid2 xs={6} className="HeaderImage">
                      </Grid2>
                      <Grid2 xs={8}>
                          <OrderForm airplanes={this.state.airplanes} setTotalCargoWeightAllowed={this.setTotalCargoWeightAllowed} />
                      </Grid2>
                      <Grid2 xs={4}>
                          <DropZone />
                      </Grid2>

                      <Grid2 xs={3} sm={4} md={12}>
                              <Items setCurrentCargoWeight={this.setCurrentCargoWeight} />
                      </Grid2>
                  </Grid2>
              </div>
            </form>
    );
  }
}

export default withSnackbar(App);
