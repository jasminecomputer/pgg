import React from "react";
import Slider from "meteor/empirica:slider";
import Choices from "./Choices.jsx";

export default class SocialExposure extends React.Component {
  renderSocialInteraction(otherPlayer) {
    const value = otherPlayer.round.get("value");
    const cumulativePayoff = otherPlayer.get("cumulativePayoff");
    const choices = otherPlayer.get("choices");
    const punishChoices = otherPlayer.get("punishChoices");
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar" />
        <div>Player key: {otherPlayer._id}</div> <br></br>
        <div>Player Total MU: {cumulativePayoff}</div>
        {/*
        <div className="range">
          Previous choices: <Choices choices={choices} />
        </div>
        <div className="range">
    Punishment choices: <Choices choices={punishChoices} /> </div>*/}
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
      <div className="social-exposure">
        <p>
          <strong>There are {otherPlayers.length} other players:</strong>
        </p>
        {otherPlayers.map((p) => this.renderSocialInteraction(p))}
      </div>
    );
  }
}