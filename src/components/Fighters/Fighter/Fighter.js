import React, { Component } from "react";

import Button from "../../Button/Button";
import "./Fighter.css";

class Fighter extends Component {
  state = {
    newName: ""
  };

  onChangeHandler = e => {
    this.setState({ newName: e.target.value });
  };

  render() {
    //const { deleteFighter } = this.props
    console.log("function", this.props.deleteFighterHandler);
    const { deleteFighterHandler, updatePerson, editing } = this.props;
    const {
      first_name,
      last_name,
      weight_class,
      id,
      thumbnail
    } = this.props.currentFighter;

    return (
      <div className="fighterCard">
        <p>{`${first_name} ${last_name}`}</p>
        <p>{weight_class}</p>
        <img
          src={
            thumbnail
              ? thumbnail
              : "data:image/jpeg;base64,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"
          }
          alt="IMAGE"
        />
        <br />
        <Button onClick={() => deleteFighterHandler(id)}>Delete Fighter</Button>
      </div>
    );
  }
}

export default Fighter;
