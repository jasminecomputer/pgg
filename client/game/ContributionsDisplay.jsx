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
        <div className="contributions-container-punishment">
          <h2 className="contributions-heading">Total Contributions</h2>
          <div className="contributions-display">
            <div className="contributions-display-child">
              <div>You contributed: </div>
              <div>{contribution}</div>
            </div>
            <div className="contributions-display-child">
              <h3 className="all-contributions-image">
                Total: {totalContributions}
              </h3>
            </div>
            <div className="contributions-display-child">
              <div>Others contributed: </div>
              <div> {totalContributions - contribution}</div>
            </div>
          </div>
          <div className="center column">
            <h2>{totalContributions} MU</h2>
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
