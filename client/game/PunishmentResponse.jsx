import React, { Component } from "react";

export default class PunishmentResponse extends React.Component {
  handleChange = (event) => {
    const { player } = this.props;
    const value = event.target.value;
    if (value != "No") {
      const punished = [...player.round.get("punished"), value];
      player.round.set("punished", punished);
    }
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

  renderInput(player) {
    /*const { player } = this.props;*/
    const contribution = player.round.get("contribution");
    return (
      <div>
        <div> Player: {player._id}</div>
        <div> Contribution: {contribution} MU </div>
        <form>
          <label>
            <input type="radio" value="No" onChange={this.handleChange} />
            Don't punish
          </label>
          <br></br>
          <label>
            <input
              type="radio"
              value={player._id}
              onChange={this.handleChange}
            />
            Punish
          </label>
        </form>
      </div>
    );
  }

  render() {
    const { game, player } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

    const punish = player.round.get("punish");
    const punished = player.round.get("punished");
    console.log(punished);

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {/*
          {this.renderInput()}*/}
          {otherPlayers.map((player) => this.renderInput(player))}

          <div>Selected option: {punish} </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
