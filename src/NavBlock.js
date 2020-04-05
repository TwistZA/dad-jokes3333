import React, { Component } from "react";
import "./NavBlock.css";

export default class NavBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.handleClearData = this.handleClearData.bind(this);
  }

  handleClick() {
    console.log("handleClick");
    this.props.newJokes();
  }

  handleClearData() {
    console.log("handleClearData");
    this.props.clearData();
  }

  render() {
    return (
      <div className="navBackground">
        <div className="navHeader">
          <span className="DadFont">DAD</span>{" "}
          <span className="JokesFont">Jokes</span>
        </div>

        <span className="navEmoji" role="img" aria-label="joy">
          😂
        </span>

        <button className="newButton" onClick={this.handleClick}>
          NEW JOKES
        </button>

        <button className="newButton" onClick={this.handleClearData}>
          Clear
        </button>
      </div>
    );
  }
}
