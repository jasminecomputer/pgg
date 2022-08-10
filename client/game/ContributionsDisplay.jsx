import React from "react";
import "./PunishmentResponse.css";

export default class ContributionsDisplay extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;
    const totalContributions = round.get("totalContributions");
    const contribution = player.round.get("contribution");

    const totalReturns = round.get("totalReturns");
    const payoff = round.get("payoff");

    return (
      <body>
        <div className="contributions-container">
          <h2 className="contributions-heading">Total Contributions</h2>
          <div className="contributions-display">
            <div className="center">
              <p>You contributed: </p>
              <p>{contribution}</p>
            </div>
            <div className="center">an image?</div>
            <div className="center">
              <p>Others contributed: </p>
              <p> {totalContributions - contribution}</p>
            </div>
          </div>
          <div className="center column">
            <h2>{totalContributions} MU </h2>
            <h2> x multiplier </h2>
            <div className="line"></div>

            <h2>Total Returns: {totalReturns} MU </h2>
            <h2>Payoff: {payoff} MU </h2>
          </div>
        </div>
      </body>
    );
  }
}
