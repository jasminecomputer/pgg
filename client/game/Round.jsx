import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import SocialExposure from "./SocialExposure.jsx";
import Task from "./Task.jsx";
import PunishmentStage from "./PunishmentStage.jsx";
import Choices from "./Choices.jsx";
import OutcomeStage from "./OutcomeStage.jsx";

export default class Round extends React.Component {
  render() {
    const { round, stage, player, game } = this.props;
    const backChoices = player.get("choices");
    const punishChoices = player.get("punishChoices");
    const groupSize = game.treatment.playerCount;
    console.log(stage.name);
    return (
      <div>
        <div>
          <div className="round">
            <div className="content">
              <PlayerProfile player={player} stage={stage} game={game} />
              <div>Group Size: {groupSize} </div>
              <div>
                {stage.name == "contribution" ? (
                  <Task
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
              {game.treatment.social ? (
                <SocialExposure stage={stage} player={player} game={game} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
