import React from "react";
import ListView from "./ListView.jsx";

export default class OutcomeStage extends React.Component {
  onNext = (event) => {
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

  render() {
    /*const { hasNext, onNext, player, round } = this.props;*/
    const { game, stage, player, round } = this.props;

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

    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div>
        <h4>Summary</h4>
        <h2>
          Punishments given to:
          {<ListView players={punishedObj} />}
        </h2>
        <h2>Punished you: {<ListView players={punishedByObj} />}</h2>

        <h2> Round payoff: {payoff} </h2>
        <h2>Remaining endowment: {remainingEndowment}</h2>
        <h2> Costs of punishing: -{costs} MU </h2>
        <h2>Total penalties: -{penalties} MU</h2>
        <h1>Total round payoff: {roundPayoff} MU</h1>
        <button type="button" onClick={this.onNext}>
          Next
        </button>
      </div>
    );
  }
}
