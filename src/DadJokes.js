import React, { Component } from "react";
import "./DadJokes.css";
import NavBlock from "./NavBlock.js";
import FlipMove from "react-flip-move";

import Joke from "./Joke.js";
const axios = require("axios").default;

export default class DadJokes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      jokes: [],
    };

    this.handleNewJokeButtonClick = this.handleNewJokeButtonClick.bind(this);
    this.handleClearDataClick = this.handleClearDataClick.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");

    let savedJokes;

    console.log("Checking localstorage....");
    console.log("localStorage.length=" + localStorage.length);

    if (localStorage.length < 1) {
      console.log("LocalStorage is EMPTY = NULL  ");
      this.makeRequest(0);
    } else {
      savedJokes = JSON.parse(localStorage.getItem("savedJokes"));
      console.log("savedJokes length = " + savedJokes.length);
      this.setState({
        jokes: savedJokes,
        loading: false,
      });
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");

    let serializedDataToBeSaved = JSON.stringify(this.state.jokes);

    localStorage.setItem("savedJokes", serializedDataToBeSaved);
  }

  async makeRequest(currentSize) {
    let res;
    let jokeSet = Array.from(this.state.jokes);
    let setOfUniqueIds;

    setOfUniqueIds = Array.from(
      jokeSet.map((item) => {
        return item.id;
      })
    );

    console.log("setOfUniqueIds=" + setOfUniqueIds);

    console.log("makeRequest:jokeSet = " + jokeSet);

    const config = {
      method: "get",
      url: "https://icanhazdadjoke.com/",
      headers: { Accept: "application/json" },
    };

    console.log("jokeSet.length = " + jokeSet.length);

    while (jokeSet.length < currentSize + 10) {
      res = await axios(config);
      //console.log(res.data);
      let joke = res.data.joke;
      let id = res.data.id;
      let score = 0;

      // check for duplicate id
      let checkDuplicate = setOfUniqueIds.filter((item) => item === id);
      if (id != checkDuplicate) {
        setOfUniqueIds.push(id);
        let newJokeObject = { id, joke, score };
        jokeSet.push(newJokeObject);
      } else {
        console.log("Duplicate found, rejecting id" + id);
      }
    }

    this.setState({
      jokes: jokeSet,
      loading: false,
    });
  }

  handleNewJokeButtonClick() {
    this.setState({ loading: true });
    this.makeRequest(this.state.jokes.length);
  }

  handleClearDataClick() {
    console.log("handleClearDataClick");
    localStorage.clear();

    this.setState({ jokes: [] });
    localStorage.removeItem("savedJokes");
  }

  handleScoreChange(id, direction) {
    const newArray = [...this.state.jokes];

    newArray.map((item) => {
      if (item.id === id) {
        if (direction === "UP") {
          item.score += 1;
        } else if (direction === "DOWN") {
          item.score -= 1;
        }
      }
      return item;
    });

    // newArray.sort((a, b) => (a.score < b.score ? 1 : -1));

    newArray.sort(function (a, b) {
      return b["score"] - a["score"] || a["id"] - b["id"];
    });

    this.setState({
      jokes: newArray,
    });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="loadingContainer">
          <span className="loadingEmoji" role="img" aria-label="joy">
            🤣
          </span>
          <div className="loadingText">Loading</div>
        </div>
      );
    } else {
      return (
        <div className="appBlock container">
          <div className="row">
            <div className="col-lg">
              <NavBlock
                newJokes={this.handleNewJokeButtonClick}
                clearData={this.handleClearDataClick}
              />
            </div>

            <div className="dadJokesBlock col-lg">
              <FlipMove>
                {this.state.jokes.map((j) => (
                  <Joke
                    joke={j.joke}
                    key={j.id}
                    score={j.score}
                    scoreChange={this.handleScoreChange}
                    id={j.id}
                  />
                ))}
              </FlipMove>
            </div>
          </div>
        </div>
      );
    }
  }
}
