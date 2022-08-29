import React from "react";
import Slider from "meteor/empirica:slider";
import "./GroupSidebar.css";

export default class GroupSidebar extends React.Component {
  renderPlayer(game, otherPlayer) {
    const cumulativePayoff = otherPlayer.get("cumulativePayoff");
    const transparency = game.treatment.groupTransparency;
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar-other" />
        {transparency ? <div> Total MU: {cumulativePayoff}</div> : null}
      </div>
    );
  }
  å;
  render() {
    const { game, player } = this.props;

    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

    if (otherPlayers.length === 0) {
      return null;
    }

    return (
      <div className="right-sidebar">
        <h4>Group Size</h4>
        <div>{game.treatment.playerCount} </div>
        <div className="players-right-sidebar">
          <div>You </div>
          {otherPlayers.map((p) => this.renderPlayer(game, p))}
        </div>
      </div>
    );
  }
}
