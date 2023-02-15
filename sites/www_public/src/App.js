import React, { Component } from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import Calendar from "./components/Calendar";
import OrderForm from "./components/OrderForm";
import DropZone from "./components/DropZone";
import Logo from "./components/Logo";
import Items from "./components/Items";

class App extends Component {

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
                      <div>plane</div>
                  </Grid2>

                  <Grid2 xs={8}>
                      <OrderForm />
                  </Grid2>
                  <Grid2 xs={4}>
                      <DropZone />
                  </Grid2>

                  <Grid2 xs={3} sm={4} md={12}>
                          <Items />
                  </Grid2>
              </Grid2>
          </div>
        </form>
    );
  }
}

export default App;
