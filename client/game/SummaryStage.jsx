import React from "react";

export default class SummaryStage extends React.Component {
  render() {
    const { stage, player, round, game } = this.props;
    const payoff = round.get("payoff");
    const punishedDict = player.round.get("punishedDict");
    const punishedObj = Object.keys(punishedDict).map(
      (item) => `${item} ${punishedDict[item]}`
    );
    const costs = player.round.get("costs");
    /* const penalties = player.round.get("penalties");*/
    const punishedBy = player.round.get("punishedBy");
    const punishedByObj = Object.keys(punishedBy).map(
      (item) => `${item} ${punishedBy[item]}`
    );
    const penalties = player.round.get("penalties");
    const roundPayoff = player.round.get("roundPayoff");
    return (
      <div>
        <h4>Summary</h4>
        <h2> Round payoff: {payoff} </h2>
        <h2>
          Punishments given to:
          {punishedObj};
        </h2>
        <h2> Costs of punishing: {costs} MU </h2>
        <h2>Received punishments from: {punishedByObj} </h2>
        <h2>Total penalties: {penalties} MU</h2>
        <h1>Total round payoff: {roundPayoff} MU</h1>
      </div>
    );
  }
}
