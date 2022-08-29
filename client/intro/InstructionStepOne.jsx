import React from "react";
import "./Instructions.css";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered>
        <div className="instructions">
          <h1> How the game works: </h1>
          <p>
            In this multi-player game, you will be in a group. Each person is
            given a set amount of money units at the start of each round. You
            will also be shown a money multiplier. There will be a public fund
            that you can choose to contribute to—you will not be able to see
            others' contributions before making your own. After everyone has
            contributed, the amount in the public fund will be multiplied by the
            money multiplier.
          </p>
          <img
            className="public-fund-img"
            src="/experiment/images/multiplication.png"
          ></img>
          <p>
            This amount is then evenly divided among the group as the "payoff".
            You get to keep the payoff and whatever you have left of your
            private funds.
          </p>
          <h1> Cumulative payoff: </h1>
          <p>
            You will have a cumulative payoff throughout the game, with each
            round's earnings being added to this amount. Try to maximize your
            cumulative payoff! When the game concludes, this will be converted
            to a cash bonus towards your final earnings.
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
