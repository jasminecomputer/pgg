import React from "react";

export default class FeedbackStage extends React.Component {
  render() {
    /*const { hasNext, onNext, player, round } = this.props;*/
    const { hasNext, onNext, game, stage, player, round } = this.props;

    const payoff = round.get("payoff");
    const punished = player.round.get("punished");
    const punishedObj = Object.keys(punished).map((p) => `${p} ${punished[p]}`);
    const costs = player.round.get("costs");
    /* const penalties = player.round.get("penalties");*/
    const punishedBy = player.round.get("punishedBy");
    const punishedByObj = Object.keys(punishedBy).map(
      (item) => `${item} ${punishedBy[item]}`
    );
    const penalties = player.round.get("penalties");
    const remainingEndowment = player.round.get("remainingEndowment");
    const roundPayoff = player.round.get("roundPayoff");
    return (
      <div>
        <h4>Summary</h4>
        <h2> Round payoff: {payoff} </h2>
        <h2>Remaining endowment: {remainingEndowment}</h2>
        <h2>
          Punishments given to:
          {punishedObj};
        </h2>
        <h2> Costs of punishing: {costs} MU </h2>
        <h2>Received punishments from: {punishedByObj} </h2>
        <h2>Total penalties: {penalties} MU</h2>
        <h1>Total round payoff: {roundPayoff} MU</h1>
        <button type="button" onClick={onNext} disabled={!hasNext}>
          Next
        </button>
      </div>
    );
  }
}
