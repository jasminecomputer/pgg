import React from "react";
import ListView from "./ListView.jsx";
import Collapsible from "./Collapsible.jsx";
import PunishmentSocialDisplay from "./PunishmentSocialDisplay.jsx";
import "./OutcomeStage.css";

export default class OutcomeStage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summaryTab: true,
      punishmentTab: false,
    };
    history.toggleSummaryTab = this.toggleSummaryTab.bind(this);
    history.togglePunishmentsTab = this.togglePunishmentsTab.bind(this);
  }
  toggleSummaryTab(e) {
    this.setState({ summaryTab: true });
    this.setState({ punishmentsTab: false });

    document.getElementById("summaryTab").className = `tabs-button--true`;
    document.getElementById("summaryContent").className = `tabs-content--true`;
    document.getElementById("punishmentsTab").className = `tabs-button--false`;
    document.getElementById(
      "punishmentsContent"
    ).className = `tabs-content--false`;
  }
  togglePunishmentsTab(e) {
    this.setState({ summaryTab: false });
    this.setState({ punishmentsTab: true });

    document.getElementById("summaryTab").className = `tabs-button--false`;
    document.getElementById("summaryContent").className = `tabs-content--false`;
    document.getElementById("punishmentsTab").className = `tabs-button--true`;
    document.getElementById(
      "punishmentsContent"
    ).className = `tabs-content--true`;
  }
  onNext = (event) => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="next-round center">
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

    /*
    if (player.stage.submitted) {
      return <body className="outcome-body"> {this.renderSubmitted()} </body>;
    }
*/
    return (
      <body className="outcome-body">
        <div className="centered-text">
          <div className="tabs-navbar">
            <button
              onClick={(e) => this.toggleSummaryTab(e)}
              className="tabs-button--true"
              id="summaryTab"
            >
              Your Round Summary
            </button>
            <button
              onClick={(e) => this.togglePunishmentsTab(e)}
              className="tabs-button--false"
              id="punishmentsTab"
            >
              View All Punishments
            </button>
          </div>
          <div className="tabs-content--true" id="summaryContent">
            <h4 className="outcome-heading">Round Summary</h4>
            <div>
              <div>
                <div className="outcome-subheading">
                  <div> You punished </div>
                  <div> Punished you </div>
                </div>
                <div className="punishment-display-container">
                  <div>
                    <div className="left-div">
                      <h2>
                        {/*You punished:*/}
                        <ListView
                          punishments={punished}
                          game={game}
                          className="punishment-social-view"
                        />
                      </h2>
                    </div>
                    <span className="right-div">
                      <h2>
                        {/*Punished you:{" "}*/}
                        {
                          <ListView
                            punishments={punishedBy}
                            game={game}
                            className="punishment-social-view"
                          />
                        }
                      </h2>
                    </span>
                  </div>
                </div>
                <div className="summary">
                  <div className="payoff-container">
                    <div className="payoff-text">
                      <h2> Round payoff: {/*{payoff} MU*/} </h2>
                      <h2>
                        Remaining endowment: {/*{remainingEndowment} MU*/}
                      </h2>
                      <h2> Punishment costs: {/*} -{costs} MU */} </h2>
                      <h2>Punishment penalties: {/*-{penalties} MU*/}</h2>
                      <div className="payoff-line"></div>

                      <h1>TOTAL</h1>
                    </div>
                    <div className="payoff-numbers">
                      <h2> {payoff} MU </h2>
                      <h2>{remainingEndowment} MU</h2>
                      <h2 className="outcome-costs"> -{costs} MU </h2>
                      <h2 className="outcome-costs"> -{penalties} MU</h2>
                      <div className="payoff-line"></div>
                      {roundPayoff >= 0 ? (
                        <h1 className="net-positive"> + {roundPayoff} MU </h1>
                      ) : (
                        <h1 className="net-negative"> {roundPayoff} MU</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-content--false" id="punishmentsContent">
            <h4 className="outcome-heading">All Punishments</h4>
            <Collapsible
              title={"View All Punishments"}
              children={otherPlayers.map((p) => (
                <PunishmentSocialDisplay game={game} player={p} me={player} />
              ))}
              game={game}
              player={player}
              round={round}
            ></Collapsible>
          </div>
        </div>
        <div className="next-round center">
          {player.stage.submitted ? (
            <body className="outcome-body"> {this.renderSubmitted()} </body>
          ) : (
            <button type="button" onClick={this.onNext} className="next-button">
              Next Round
            </button>
          )}
        </div>
      </body>
    );
  }
}
