import React from "react";
import ListView from "./ListView.jsx";
import "./OutcomeStage.css";

export default class PunishmentSocialDisplay extends React.Component {
  render() {
    const { game, player, me } = this.props;
    const punished = player.round.get("punished");
    const punishedBy = player.round.get("punishedBy");
    const contribution = player.round.get("contribution");

    return (
      <div className="punishment-social-view">
        <h2>
          Player:
          <span>
            {<img src={player.get("avatar")} className="player-avatar" />}
          </span>
          <div> Contributed: {contribution} MU </div>
        </h2>
        <h2 className="flex-item">
          Punished:
          <ListView
            punishments={punished}
            game={game}
            className="punishment-all-view"
            me={me}
          />
        </h2>
        <h2 className="flex-item">
          Punished by:
          <ListView
            punishments={punishedBy}
            game={game}
            className="punishment-all-view"
            me={me}
          />
        </h2>
      </div>
    );
  }
}
