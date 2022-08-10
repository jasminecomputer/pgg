import React from "react";
import "./OutcomeStage.css";

export default class ListView extends React.Component {
  renderPlayer(game, playerId, punishments) {
    console.log(game.players);
    const player = game.players.find((player) => player._id === playerId);
    console.log(player);
    return (
      <div>
        {<img src={player.get("avatar")} className="player-avatar" />}
        {/*<img src={`/avatars/jdenticon/${player}`} className="player-avatar" />*/}

        <p>x{punishments[playerId]}</p>
      </div>
    );
  }

  render() {
    const { game, punishments, className } = this.props;
    console.log(punishments);
    let nonzeroPunishments = {};
    for (const key of Object.keys(punishments)) {
      if (punishments[key] != "0") {
        nonzeroPunishments[key] = punishments[key];
      } else {
      }
    }

    console.log("nonzero punishments", nonzeroPunishments);

    if (Object.keys(nonzeroPunishments).length == 0) {
      return <div className="none"> None </div>;
    }

    return (
      <div className={className}>
        {Object.keys(nonzeroPunishments).map((p) =>
          this.renderPlayer(game, p, nonzeroPunishments)
        )}
      </div>
    );
  }
}
