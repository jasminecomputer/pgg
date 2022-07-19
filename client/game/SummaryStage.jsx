import React from "react";

export default class SummaryStage extends React.Component {
  render() {
    const { stage, player, round, game } = this.props;
    const payoff = round.get("payoff");
    const punished = player.round.get("punished");
    const costs = punished.length;
    /* const penalties = player.round.get("penalties");*/
    const punishedBy = player.round.get("punishedBy");
    const penalties = parseFloat(punishedBy.length) * parseFloat(3);
    const roundPayoff = player.round.get("roundPayoff");
    return (
      <div>
        <h4>Summary</h4>
        <h2> Round payoff: {payoff} </h2>
        <h2>Punishments given to: {punished} </h2>
        <h2> Costs of punishing: {costs} MU </h2>
        <h2>Received punishments from: {punishedBy} </h2>
        <h2>Total penalties: {penalties} MU</h2>
        <h1>Total round payoff: {roundPayoff} MU</h1>
      </div>
    );
  }
}
