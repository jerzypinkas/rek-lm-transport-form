import React, { Component } from 'react';
import './App.css';
import TransportOrder from "./components/TransportOrder";

class App extends Component {
  render() {
    return (
      <div className="App">
          <TransportOrder />
      </div>
    );
  }
}

export default App;
