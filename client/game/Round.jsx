import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import GroupView from "./GroupView.jsx";
import Contribution from "./Contribution.jsx";
import PunishmentStage from "./PunishmentStage.jsx";
import OutcomeStage from "./OutcomeStage.jsx";
import "./Sidebar.css";
import "./RightSidebar.css";

export default class Round extends React.Component {
  render() {
    const { round, stage, player, game } = this.props;
    const social = game.treatment.social;
    return (
      <div className="round">
        <div className="round-content">
          <div className="sidebar-container">
            <PlayerProfile player={player} stage={stage} game={game} />
          </div>

          <div>
            {stage.name == "contribution" ? (
              <Contribution
                game={game}
                round={round}
                stage={stage}
                player={player}
              />
            ) : null}
          </div>
          {stage.name == "punishment" ? (
            <PunishmentStage
              game={game}
              round={round}
              stage={stage}
              player={player}
            />
          ) : null}
          {stage.name == "outcome" ? (
            <OutcomeStage
              stage={stage}
              player={player}
              game={game}
              round={round}
            />
          ) : null}
          <div className="right-sidebar-container">
            {stage.name == "contribution" ? (
              <GroupView player={player} stage={stage} game={game} />
            ) : null}
          </div>
          {/*
          <div className="right-sidebar-container">
            <GroupView player={player} stage={stage} game={game} />
            </div>*/}

          {social ? (
            <div>
              <SocialExposure stage={stage} player={player} game={game} />{" "}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
