import React from "react";
import ListView from "./ListView.jsx";
import Collapsible from "./Collapsible.jsx";
import PunishmentSocialDisplay from "./PunishmentSocialDisplay.jsx";
import "./OutcomeStage.css";

export default class OutcomeStage extends React.Component {
  onNext = (event) => {
    event.preventDefault();
    this.props.player.stage.submit();
  };
  renderSubmitted() {
    return (
      <div className="center">
        <div className="center">
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
    const costs = player.round.get("costs");
    const punishedBy = player.round.get("punishedBy");
    const penalties = player.round.get("penalties");
    const remainingEndowment = player.round.get("remainingEndowment");
    const roundPayoff = player.round.get("roundPayoff");
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

    if (player.stage.submitted) {
      return <body className="outcome-body"> {this.renderSubmitted()} </body>;
    }

    return (
      <body className="outcome-body">
        <div className="centered-text">
          <h4 className="outcome-heading">Round Summary</h4>
          <div className="punishment-display-container">
            <div className="split-punishment">
              <h2>
                You punished:
                <ListView
                  punishments={punished}
                  game={game}
                  className="punishment-social-view"
                />
              </h2>
              <h2>
                Punished you:{" "}
                {
                  <ListView
                    punishments={punishedBy}
                    game={game}
                    className="punishment-social-view"
                  />
                }
              </h2>
            </div>
          </div>
          <div className="summary">
            <div className="payoff-container">
              <div className="payoff-text">
                <h2> Round payoff: {/*{payoff} MU*/} </h2>
                <h2>Remaining endowment: {/*{remainingEndowment} MU*/}</h2>
                <h2> Punishment costs:{/*} -{costs} MU*/} </h2>
                <h2>Punishment penalties: {/*-{penalties} MU*/}</h2>
                <div className="payoff-line"></div>

                <h1>TOTAL</h1>
              </div>
              <div className="payoff-numbers">
                <h2> {payoff} MU </h2>
                <h2>{remainingEndowment} MU</h2>
                <h2> -{costs} MU </h2>
                <h2> -{penalties} MU</h2>
                <div className="payoff-line"></div>

                <h1>
                  {roundPayoff >= 0 ? <span>+</span> : null}
                  {roundPayoff} MU
                </h1>
              </div>
            </div>
          </div>
        </div>
        <Collapsible
          title={"View All Punishments"}
          children={otherPlayers.map((p) => (
            <PunishmentSocialDisplay game={game} player={p} me={player} />
          ))}
          game={game}
          player={player}
          round={round}
        ></Collapsible>
        <div className="center">
          <button type="button" onClick={this.onNext} className="next-button">
            Next Round
          </button>
        </div>
      </body>
    );
  }
}
