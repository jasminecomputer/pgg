import React from "react";
import PunishmentResponse from "./PunishmentResponse.jsx";
import ContributionsDisplay from "./ContributionsDisplay.jsx";
import "./PunishmentResponse.css";

export default class PunishmentStage extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    return (
      <body className="punishment-body">
        <div>
          <ContributionsDisplay
            game={game}
            round={round}
            stage={stage}
            player={player}
          />
          <div>
            <PunishmentResponse
              game={game}
              round={round}
              stage={stage}
              player={player}
            />
          </div>
        </div>
      </body>
    );
  }
}
