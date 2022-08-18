import React, { Component } from "react";
import "./Contribution.css";

export default class ContributionResponse extends React.Component {
  handleChange = (event) => {
    const { player } = this.props;
    const value = parseFloat(event.target.value);
    player.round.set("contribution", value);
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="contribution-response-container">
        <div className="contribution-submitted text-size">
          <h5>Waiting on other players' contributions...</h5>
        </div>
      </div>
    );
  }

  renderInput() {
    const { game, player } = this.props;
    const endowment = game.treatment.endowment;
    return (
      <div>
        <div>Amount you would like to contribute:</div>

        <label>
          <input
            type="number"
            onChange={this.handleChange}
            min="0"
            max={endowment}
            className="text-area"
          />
        </label>
        <br></br>
        {/*
        <label>
          <input
            type="radio"
            value="Contribute"
            checked={value == "Contribute"}
            onChange={this.handleChange}
          />
          Contribute
        </label>
    */}
      </div>
    );
  }

  render() {
    const { player, game } = this.props;
    const contribution = player.round.get("contribution");
    const endowment = game.treatment.endowment;
    const keep = endowment - parseFloat(contribution);
    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="contribution-response-container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput()}

          {/*<div>Contribute: {contribution} </div>*/}
          {0 <= parseFloat(contribution) && contribution <= endowment ? (
            <div> You keep: {keep} </div>
          ) : null}

          <button type="submit" className="contribute-button">
            Contribute
          </button>
        </form>
      </div>
    );
  }
}
