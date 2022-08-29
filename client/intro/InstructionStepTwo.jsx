import React from "react";
import "./Instructions.css";
import { Centered } from "meteor/empirica:core";

export default class InstructionStepTwo extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
    const punishmentRate = game.treatment.punishment;
    return (
      <Centered>
        <div className="instructions">
          <h1> Viewing the group's contributions: </h1>
          <p>
            After each round of contributions, you will be able to see how much
            each member contributed, as shown below:
          </p>

          <img
            src="/experiment/images/InstructionsPunishment.png"
            className="instructions-img-punishment"
          ></img>
          <h1> Punishment: </h1>
          <p>
            You have the ability to punish your group members if you feel that
            they did not contribute enough, but if you choose to punish someone,
            you will incur a cost, too! Each unit you spend punishing someone
            will deduct {punishmentRate} units from another player and 1 unit
            from your cumulative payoff. You can punish players as long as you
            have a positive cumulative payoff.
          </p>
          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
      </Centered>
    );
  }
}
