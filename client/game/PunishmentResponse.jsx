import React, { Component } from "react";
import "./PunishmentResponse.css";

export default class PunishmentResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      amountValid: false,
      punishmentDict: {},
    };
  }

  handleChange = (event, param) => {
    const { player } = this.props;
    const punished = player.round.get("punished");
    punished[param] = event.target.value;
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
    let negatives = 0;

    for (const key of punishedKeys) {
      if (parseFloat(punished[key]) < 0) {
        negatives += 1;
      }
      totalPunishmentCost += parseFloat(punished[key]);
    }
    console.log("negatives", negatives);

    if (totalPunishmentCost > cumulativePayoff) {
      this.setState({
        formError: "Error: punishment cost exceeds your total MU",
      });
    } else if (negatives > 0) {
      this.setState({ formError: "Error: punishment cannot be negative" });
    } else {
      this.setState({ formError: "" });
    }
    console.log("error", this.state.formError);
    if (totalPunishmentCost > cumulativePayoff || negatives > 0) {
    } else {
      this.props.player.stage.submit();
    }
  };

  renderSubmitted() {
    return (
      <div>
        <div className="punishment-submitted center">
          <h5>Waiting on other players' punishments...</h5>
        </div>
      </div>
    );
  }
  renderInput(player) {
    const contribution = player.round.get("contribution");

    return (
      <div className="center">
        {<img src={player.get("avatar")} className="player-avatar" />}
        <div> Contributed: {contribution} MU </div>
        <form>
          <label>
            <input
              type="number"
              id={player._id}
              onChange={(event) => this.handleChange(event, player._id)}
              min="0"
              placeholder="# of punishments"
              className="input-area"
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
          {<img src={player.get("avatar")} className="player-avatar" />}
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
        <div className="otherPlayers">
          <form onSubmit={this.handleSubmit}>
            {/*

          {this.renderInput()}*/}

            <div className="row">
              {otherPlayers.map((player) => this.renderInput(player))}
            </div>
            <div className="center">
              <button type="submit" className="punish-button">
                Punish
              </button>
            </div>

            <p className="center">{formError}</p>
          </form>
        </div>
      );
    } else {
      return <div>{this.props.player.stage.submit()}</div>;
    }
  }
}
