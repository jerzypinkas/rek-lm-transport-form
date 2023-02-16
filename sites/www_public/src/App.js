import React, {Component, useState} from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import Calendar from "./components/Calendar";
import OrderForm from "./components/OrderForm";
import DropZone from "./components/DropZone";
import Logo from "./components/Logo";
import Items from "./components/Items";
import Plane from "./components/Plane";
// import { CargoCurrent, CargoLimit } from "./components/Cargo";




class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            airplanes: [],
            totalCargoWeightAllowed: 0,
            currentCargoWeight: 0
        };

        // this.setTotalCargoWeightAllowed = this.setTotalCargoWeightAllowed.bind(this);

        // const [cargoLimit, setCargoLimit] = useState();
        // const [cargoCurrent, setCargoCurrent] = useState();
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
                // console.log(data.data)
                this.setState({
                    airplanes: data.data
                });
                // console.log(this.state)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // componentWillUnmount() {
    //     console.log(this.state)
    // }


    setTotalCargoWeightAllowed = (payload) => {
        // console.log(weight)
        // this.state.totalCargoWeightAllowed = payload
        this.setState(prevState => ({
            totalCargoWeightAllowed: {
                ...prevState.totalCargoWeightAllowed,
                totalCargoWeightAllowed: payload,
                // [prevState.totalCargoWeightAllowed]: payload,
            },
        }));
        console.log(this.state);
        // this.setState(...this.state, {totalCargoWeightAllowed: payload})
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event);
    }

  render() {
    return (

        // <CargoCurrent.Provider value={{cargoCurrent, setCargoCurrent}}>
            <form onSubmit={this.handleSubmit}>
              <div className="App">
                  <Grid2 container spacing={0.5}>
                      <Grid2 xs={6}>
                          <Logo />
                      </Grid2>
                      <Grid2 xs={6}>
                          <Plane currentCargoWeight={this.state.currentCargoWeight} totalCargoWeightAllowed={this.state.totalCargoWeightAllowed} />
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
        // </CargoCurrent.Provider>
    );
  }
}

export default App;
