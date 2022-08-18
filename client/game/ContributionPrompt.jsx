import React from "react";
import "./Contribution.css";
export default class ContributionPrompt extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    const multiplier = game.treatment.multiplier;
    const endowment = game.treatment.endowment;
    const returnsA = (endowment * multiplier) / 2;
    const returnsB = (endowment * multiplier) / 2 + endowment;
    const returnsBoth = endowment * multiplier;
    const returnsNeither = 0;
    /*const returnsBoth = (
      ((parseFloat(playerValue) + parseFloat(playerBValue)) * multiplier) /
      2
    ).toFixed(0);
    const returnsA = ((playerValue * multiplier) / 2).toFixed(0);
    const returnsA_other = parseFloat(returnsA) + parseFloat(playerBValue);

    const returnsB = ((playerBValue * multiplier) / 2).toFixed(0);
    const returnsB_other = parseFloat(returnsB) + parseFloat(playerValue);
    */

    return (
      <div>
        <div className="contribution-container">
          <h2 className="contribution-heading">
            {" "}
            Round endowment: {endowment}{" "}
          </h2>
          <h3 className="contribution-image"> Multiplier: {multiplier} </h3>
        </div>
        <div className="contribution-instructions">
          You may decide what to do with your {endowment} money units.
          <p>
            The total amount contributed will be multiplied by the multiplier
            then equally divided among the group.
          </p>
        </div>
        {/*
        <div>Rounded table shown below</div>

        <div>
          <table>
            <tr>
              <th></th>
              <th>B contributes</th>
              <th>B does not contribute</th>
            </tr>
            <tr>
              <th>You contribute</th>
              <th>
                {returnsBoth} / {returnsBoth}
              </th>
              <th>
                {returnsA} / {returnsB}
              </th>
            </tr>
            <tr>
              <th> You do not contribute </th>
              <th>
                {returnsB} / {returnsA}
              </th>
              <th>
                {returnsNeither} / {returnsNeither}
              </th>
            </tr>
          </table>
            </div>

    */}
      </div>
    );
  }
}
