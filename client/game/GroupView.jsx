import React from "react";
import Slider from "meteor/empirica:slider";
import Choices from "./ListView.jsx";
import "./RightSidebar.css";

export default class GroupView extends React.Component {
  renderSocialInteraction(otherPlayer) {
    const cumulativePayoff = otherPlayer.get("cumulativePayoff");
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar-other" />
        {/*} <div>Player key: {otherPlayer._id}</div> <br></br>*/}
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
        <div>{game.treatment.playerCount}</div>
        <div className="players-right-sidebar">
          {otherPlayers.map((p) => this.renderSocialInteraction(p))}
        </div>
      </div>
    );
  }
}
