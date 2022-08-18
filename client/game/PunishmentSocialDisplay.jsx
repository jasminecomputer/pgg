import React from "react";
import ListView from "./ListView.jsx";
import "./OutcomeStage.css";

export default class PunishmentSocialDisplay extends React.Component {
  render() {
    const { game, player, me } = this.props;
    const punished = player.round.get("punished");
    const punishedBy = player.round.get("punishedBy");
    const penalties = player.round.get("penalties");
    const contribution = player.round.get("contribution");

    return (
      <div className="punishment-all-view">
        <h2>
          <span>
            {
              <img
                src={player.get("avatar")}
                className="player-avatar-allview"
              />
            }
          </span>
          <div> Contributed: {contribution} MU </div>
          <div> Penalties: {penalties} MU </div>
        </h2>
        <div className="left-div-social">
          Punished:
          <ListView
            punishments={punished}
            game={game}
            className="punishment-social-view"
            me={me}
          />
        </div>
        <div className="right-div-social">
          Punished by:
          <ListView
            punishments={punishedBy}
            game={game}
            className="punishment-social-view"
            me={me}
          />
        </div>
      </div>
    );
  }
}
