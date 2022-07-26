import React from "react";

export default class TaskStimulus extends React.Component {
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
    /*
    const returnsA = ((playerValue * multiplier) / 2).toFixed(0);
    const returnsA_other = parseFloat(returnsA) + parseFloat(playerBValue);

    const returnsB = ((playerBValue * multiplier) / 2).toFixed(0);
    const returnsB_other = parseFloat(returnsB) + parseFloat(playerValue);
    */

    return (
      <div className="task-stimulus">
        <h3> Multiplier: {multiplier} </h3>
        <h3> Your endowment: {endowment} </h3>

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
        <div className="task-question">How much do you want to contribute?</div>
      </div>
    );
  }
}
