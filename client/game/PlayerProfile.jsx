import React from "react";
import { Icon } from "@blueprintjs/core";
import "./Sidebar.css";
import Timer from "./Timer.jsx";

export default class PlayerProfile extends React.Component {
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

  renderGroupSize() {
    const { game } = this.props;
    const groupSize = game.treatment.playerCount;
    return (
      <div>
        <h4>Group Size</h4>
        <span>{groupSize}</span>{" "}
      </div>
    );
  }

  render() {
    const { stage } = this.props;

    return (
      <aside className="sidebar">
        <div className="sidebar-stats">
          {this.renderProfile()}
          {this.renderScore()}
          {/*this.renderGroupSize()*/}
        </div>
        <div className="timer-sidebar">
          <Timer stage={stage} />
        </div>
      </aside>
    );
  }
}
