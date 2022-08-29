import React from "react";
import { Icon } from "@blueprintjs/core";
import "./PlayerSidebar.css";
import Timer from "./Timer.jsx";

export default class PlayerSidebar extends React.Component {
  renderProfile() {
    const { player } = this.props;
    return (
      <div className="circle">
        <img
          src={player.get("avatar")}
          className="profile-avatar avatar-background"
        />
      </div>
    );
  }

  renderScore() {
    const { player } = this.props;
    return (
      <div>
        <h4>Total MU</h4>
        <span>{player.get("cumulativePayoff")}</span>
      </div>
    );
  }

  renderNumRounds() {
    const { game, round } = this.props;
    const numRounds = game.treatment.numRounds;
    return (
      <div>
        <h4>Round</h4>
        <span>
          {round.index + 1}/{numRounds}
        </span>{" "}
      </div>
    );
  }

  render() {
    const { game, stage, round } = this.props;
    const showNRounds = game.treatment.showNRounds;

    return (
      <aside className="sidebar">
        <div className="sidebar-stats">
          {this.renderProfile()}
          {this.renderScore()}
          {showNRounds ? this.renderNumRounds() : null}
          <Timer stage={stage} />
        </div>
        {/*
        <div className="timer-sidebar">
          <Timer stage={stage} />
    </div>*/}
      </aside>
    );
  }
}
