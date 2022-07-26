import React from "react";
import PunishmentResponse from "./PunishmentResponse.jsx";

export default class PunishmentStage extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;
    const totalContributions = round.get("totalContributions");
    const contribution = player.round.get("contribution");
    const multiplier = game.treatment.punishmentMultiplier;

    const totalReturns = round.get("totalReturns");
    const payoff = round.get("payoff");

    return (
      <div>
        <h2>Total Contributions: {totalContributions} MU </h2>
        <h2>Your Contribution: {contribution} MU </h2>

        <h2>Total Returns: {totalReturns} MU </h2>

        <h2>Individual payoff: {payoff} MU </h2>

        <div></div>
        <h3>Costs you 1 MU to impose each punishment of {multiplier} MU</h3>
        <h3>How many punishments do you want to impose?</h3>

        <div>
          <PunishmentResponse
            game={game}
            round={round}
            stage={stage}
            player={player}
          />
        </div>
      </div>
    );
  }
}
