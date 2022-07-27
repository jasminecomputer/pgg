import React, { Component } from "react";

export default class TaskResponse extends React.Component {
  handleChange = (event) => {
    const { player } = this.props;
    const value = event.target.value;
    player.round.set("contribution", value);
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderInput() {
    const { game, player } = this.props;
    const endowment = game.treatment.endowment;
    return (
      <div>
        <label>
          <input
            type="number"
            onChange={this.handleChange}
            min="0"
            max={endowment}
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
    const keep = game.treatment.endowment - parseFloat(contribution);
    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput()}

          <div>Contribute: {contribution} </div>
          <div>Keep: {keep} </div>

          <button type="submit">Contribute</button>
        </form>
      </div>
    );
  }
}
