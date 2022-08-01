import React, { Component } from "react";

export default class PunishmentResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      amountValid: false,
    };
  }

  handleChange = (event, param) => {
    const { player } = this.props;
    console.log(event.target.value);
    console.log(param);
    this.setState({ formError: "" });
    const punished = player.round.get("punished");
    punished[param] = event.target.value;
    console.log("updated punished", punished);
    player.round.set("punished", punished);
  };

  handleClick = (event, player) => {
    event.preventDefault();
    showInput = true;
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    const punished = player.round.get("punished");

    const cumulativePayoff = parseFloat(player.get("cumulativePayoff"));
    let totalPunishmentCost = 0;
    const punishedKeys = Object.keys(punished);

    for (const key of punishedKeys) {
      totalPunishmentCost += parseFloat(punished[key]);
    }
    console.log("total punishment cost", totalPunishmentCost);
    console.log("payoff", cumulativePayoff);
    console.log(totalPunishmentCost > cumulativePayoff);

    if (totalPunishmentCost > cumulativePayoff) {
      console.log("total punishment cost exceeds payoff");
      this.setState({ formError: "Error: punishment cost exceeds payoff" });
    } else {
      this.setState({ formError: "" });
    }
    console.log("error", this.state.formError);
    if (totalPunishmentCost > cumulativePayoff) {
    } else {
      this.props.player.stage.submit();
    }
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players' punishments...</h5>
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
        {/*<img src={player.get("avatar")} className="profile-avatar" />*/}
        <div> Contribution: {contribution} MU </div>
        <form>
          <label>
            Punishments
            <input
              type="number"
              id={player._id}
              onChange={(event) => this.handleChange(event, player._id)}
              min="0"
            />
          </label>
        </form>
      </div>
    );
  }

  renderPlayer(player) {
    const contribution = player.round.get("contribution");
    let showInput = false;
    return (
      <div>
        <button onClick={(event) => this.handleClick(event, player)}>
          Player: {player._id}
          <div>Contribution: {contribution} MU</div>
        </button>
        {showInput ? this.renderInput(player) : null}
      </div>
    );
  }

  render() {
    const { game, player } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const formError = this.state.formError;
    const cumulativePayoff = player.get("cumulativePayoff");

    // If the player already submitted, don't show the input or submit button
    if (player.stage.submitted) {
      if (cumulativePayoff < 0) {
        return (
          <div>
            <div>You do not have enough to punish other players</div>
            {this.renderSubmitted()}
          </div>
        );
      }
      return this.renderSubmitted();
    }

    if (cumulativePayoff > 0) {
      return (
        <div className="task-response">
          <form onSubmit={this.handleSubmit}>
            {/*
          {this.renderInput()}*/}
            {otherPlayers.map((player) => this.renderInput(player))}
            <button type="submit">Submit</button>
            <p>{formError}</p>
          </form>
        </div>
      );
    } else {
      return <div>{this.props.player.stage.submit()}</div>;
    }
  }
}
