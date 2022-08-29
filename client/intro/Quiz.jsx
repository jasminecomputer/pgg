import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { players: "", punishment: "", payoff: "", kept: "" };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = (players, punishmentRate) => (event) => {
    event.preventDefault();

    if (
      this.state.players !== String(players - 1) ||
      this.state.punishment !== String(2 * punishmentRate) ||
      this.state.payoff != "10" ||
      this.state.kept != "6"
    ) {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
    const { players, punishment, payoff, kept } = this.state;
    const playerCount = game.treatment.playerCount;
    const punishmentRate = game.treatment.punishment;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quiz </h1>
          <form onSubmit={this.handleSubmit(playerCount, punishmentRate)}>
            <p>
              <label htmlFor="sum">
                {" "}
                In this game there will be a total of {playerCount} players. How
                many players are there other than yourself?{" "}
              </label>
              <input
                type="text"
                dir="auto"
                id="sum"
                name="players"
                placeholder="e.g. 1"
                value={players}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="horse">
                {" "}
                Imagine that in a given round, you have a starting fund of 10
                MU. If you contribute 4 MU, how much of your starting funds do
                you keep?
              </label>
              <input
                type="text"
                dir="auto"
                id="kept"
                name="kept"
                placeholder="e.g. 10"
                value={kept}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="horse">
                Imagine that in a given round, the money multiplier is 2 and
                players contributed the following amounts:
                <div> Player 1: 10 MU </div> <div> Player 2: 4 MU </div>
                <div> Player 3: 1 MU </div>
                What is the round payoff? (round payoff = sum of contributions x
                multiplier / the number of players){" "}
              </label>
              <input
                type="text"
                dir="auto"
                id="payoff"
                name="payoff"
                placeholder="e.g. 20"
                value={payoff}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>

            <p>
              <label htmlFor="horse">
                Each money unit you spend to punish someone deducts{" "}
                {punishmentRate} MU from them. If you spend 2 MU to punish
                someone, how many MU will be deducted from them?
              </label>
              <input
                type="text"
                dir="auto"
                id="punishment"
                name="punishment"
                placeholder="e.g. 2"
                value={punishment}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
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
