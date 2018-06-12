import React, { Component } from "react";
import axios from "axios";
import "./Fighters.css";
import Fighter from "./Fighter/Fighter";

import Button from "../Button/Button";

class Fighters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      data: [],
      newFighter: "",
      filter: "",
      first_name: "",
      last_name: "",
      weight_class: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3005/api/fighters/").then(response => {
      // console.log(response.data);
      this.setState({ data: response.data });
    });
  }

  deleteFighterHandler = id => {
    axios.delete(`http://localhost:3005/api/fighters/${id}`).then(response => {
      this.setState({ data: response.data });
    });
  };

  updateFighterHandler = (weight_class, id) => {
    axios
      .put(`http://localhost:3005/api/fighters/${id}`, {
        weight_class
      })
      .then(response => {
        this.setState({ fighters: response.data, editing: false });
      });
  };

  filterFighterHandler = e => {
    this.setState({ filter: e.target.value });

    axios
      .get(`/api/fighters/filter?filter=${e.target.value}`)
      .then(response => {
        this.setState({ fighters: response.data });
      });
  };

  onChangeHandler = e => {
    this.setState({ newFighter: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post("/api/fighters", { name: this.state.newFighter })
      .then(response => {
        this.setState({ data: response.data, newFighter: "" });
      });
  };

  onEditHandler = () => {
    this.setState({ editing: !this.setState.editing });
  };

  onAddHandler = () => {
    axios
      .post("/api/fighters", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        weight_class: this.state.weight_class
      })
      .then(response => {
        this.setState({ data: response.data });
      });
  };

  render() {
    <div className="newInput">
      <input
        onChange={e => this.setState({ first_name: e.target.value })}
        type="text"
      />
      <input
        onChange={e => this.setState({ last_name: e.target.value })}
        type="text"
      />
      <input
        onChange={e => this.setState({ weight_class: e.target.value })}
        type="text"
      />
    </div>;

    const fighterList = this.state.data.map((currentFighter, index) => {
      return (
        <Fighter
          currentFighter={currentFighter}
          deleteFighterHandler={this.deleteFighterHandler}
          updateFighterHandler={this.updateFighterHandler}
          filterFighterHandler={this.filterFighterHandler}
          key={index}
        />
      );
    });

    return (
      <div>
        <div>
          <Button clicked={this.onEditHandler}>Edit</Button>
          <input
            value={this.state.filter}
            onChange={this.filterPeopleHandler}
            type="text"
            placeholder="Filter"
          />
        </div>
        <div>
          <input
            onChange={e => this.setState({ first_name: e.target.value })}
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={e => this.setState({ last_name: e.target.value })}
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={e => this.setState({ weight_class: e.target.value })}
            type="text"
            placeholder="Weight Class"
          />
          <Button onClick={this.onAddHandler}>SUBMIT</Button>
        </div>
        <div className="fighters">{fighterList}</div>
      </div>
    );
  }
}

export default Fighters;
