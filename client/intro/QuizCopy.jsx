import React from "react";

import { Centered } from "meteor/empirica:core";

export default class QuizCopy extends React.Component {
  state = { both: "", falseB: "", falseA: "", neither: "" };

  /*handleAnswerOptionClick = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };
  */

  onChangeValue = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (
      this.state.both !== "220 points" ||
      this.state.falseB !== "105 points" ||
      this.state.falseA !== "205 points" ||
      this.state.neither !== "100 points"
    ) {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { both, falseA, falseB, neither } = this.state;
    const answerOptions = [
      { answerText: "220 points", correct: "both" },
      { answerText: "105 points", correct: "falseB" },
      { answerText: "205 points", correct: "falseA" },
      { answerText: "100 points", correct: "neither" },
    ];
    return (
      <Centered>
        <div className="quiz">
          <h1>Quiz </h1>
          <h3>
            Before we start, we would like to check whether you have truly
            understood the structure of the game.
          </h3>
          <div>
            <h4>Imagine the following game:</h4>
            <table>
              <tr>
                <th></th>
                <th>Player B contributes</th>
                <th>Player B doesn't contribute</th>
              </tr>
              <tr>
                <th>You contribute</th>
                <th>220 / 220</th>
                <th>105 / 205</th>
              </tr>
              <tr>
                <th> You don't contribute </th>
                <th>205 / 105</th>
                <th>100 / 100</th>
              </tr>
            </table>
          </div>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="sum">
                Imagine that you contributed to the common pool. If Player B
                contributes, you get:
              </label>
              {answerOptions.map((answerOption) => (
                <div onChange={this.onChangeValue}>
                  <input
                    type="radio"
                    name="both"
                    value={answerOption.answerText}
                  />
                  {answerOption.answerText}
                </div>
              ))}
            </p>
            <p>
              <label htmlFor="horse">
                Imagine that you contributed to the common pool. If Player B
                doesn't contribute, you get:
              </label>
              {answerOptions.map((answerOption) => (
                <div onChange={this.onChangeValue}>
                  <input
                    type="radio"
                    name="falseB"
                    value={answerOption.answerText}
                  />
                  {answerOption.answerText}
                </div>
              ))}
            </p>
            <p>
              <label htmlFor="sum">
                Imagine that you didn't contribute to the common pool. If Player
                B contributes, you get:
              </label>
              {answerOptions.map((answerOption) => (
                <div onChange={this.onChangeValue}>
                  <input
                    type="radio"
                    name="falseA"
                    value={answerOption.answerText}
                  />
                  {answerOption.answerText}
                </div>
              ))}
            </p>
            <p>
              <label htmlFor="sum">
                Imagine that you didn't contribute to the common pool. If Player
                B doesn't contribute, you get:
              </label>
              {answerOptions.map((answerOption) => (
                <div onChange={this.onChangeValue}>
                  <input
                    type="radio"
                    name="neither"
                    value={answerOption.answerText}
                  />
                  {answerOption.answerText}
                </div>
              ))}
            </p>
            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </button>
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>
    );
  }
}
