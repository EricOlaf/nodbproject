import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Fighters from "./components/Fighters/Fighters";

class App extends Component {
  constructor() {
    super();
    this.state = {
   //   data: []
    };
  }
  
  render() {
   
    return (
      <div className="App">
        <h1 className="title"> Fighter No DB Project </h1>
        <Fighters/>
      </div>
    );
  }
}

export default App;
