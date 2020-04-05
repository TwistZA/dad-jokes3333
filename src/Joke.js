import React, { Component } from "react";
import "./Joke.css";

export default class Joke extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  getScoreColor(score) {
    return true;
  }

  handleUpClick(e, props) {
    console.log("Click UP");
    e.preventDefault();
    this.props.scoreChange(this.props.id, "UP");
  }

  handleDownClick(e, props) {
    console.log("Click DOWN");
    e.preventDefault();
    this.props.scoreChange(this.props.id, "DOWN");
  }

  getScoreRangeColor(s) {
    if (s >= 15) {
      return "scoreAbove15";
    } else if (s >= 12 && s < 15) {
      return "scoreAbove12";
    } else if (s >= 10 && s < 12) {
      return "scoreAbove10";
    } else if (s >= 8 && s < 10) {
      return "scoreAbove8";
    } else if (s >= 6 && s < 8) {
      return "scoreAbove6";
    } else if (s >= 4 && s < 6) {
      return "scoreAbove4";
    } else if (s >= 2 && s < 4) {
      return "scoreAbove2";
    } else if (s < 2) {
      return "scoreBelow2";
    }
  }

  getScoreEmoji(s) {
    if (s >= 11) {
      return "🤣";
    } else if (s >= 8 && s < 11) {
      return "😆";
    } else if (s >= 6 && s < 8) {
      return "😃";
    } else if (s >= 4 && s < 6) {
      return "🙂";
    } else if (s >= 0 && s < 4) {
      return "😕";
    } else if (s < 0) {
      return "😡";
    }
  }

  render() {
    let scoreColor = this.getScoreRangeColor(this.props.score);
    let scoreClassNames = `score ${scoreColor}`;

    return (
      <div className="jokeDiv">
        <i className="fas fa-arrow-up" onClick={this.handleUpClick}></i>
        <div className={scoreClassNames}>{this.props.score}</div>
        <i className="fas fa-arrow-down" onClick={this.handleDownClick}></i>

        <div className="jokeText">{this.props.joke}</div>
        <div className="scoreEmoji">{this.getScoreEmoji(this.props.score)}</div>
      </div>
    );
  }
}
