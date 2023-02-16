import React, {Component, useState} from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import OrderForm from "./components/OrderForm";
import DropZone from "./components/DropZone";
import Logo from "./components/Logo";
import Items from "./components/Items";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            airplanes: [],
            totalCargoWeightAllowed: 0,
            currentCargoWeight: 2
        };

    }


    componentDidMount(){
        fetch('http://localhost/api/airplanes', {
            method: 'GET', // or 'PUT'
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
        // console.log(event);
    }

  render() {
    return (

            <form onSubmit={this.handleSubmit}>
              <div className="App">
                  <Grid2 container spacing={0.5}>
                      <Grid2 xs={6}>
                          <Logo />
                      </Grid2>
                      <Grid2 xs={6}>
                          {this.state.totalCargoWeightAllowed}
                          {/*<Plane currentCargoWeight={this.state.currentCargoWeight} totalCargoWeightAllowed={this.state.totalCargoWeightAllowed} />*/}
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

export default App;
