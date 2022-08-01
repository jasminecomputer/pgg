import React from "react";

export default class ListView extends React.Component {
  renderPlayer(player, punishments) {
    return (
      <div>
        {player}
        <p>{punishments[player]}</p>
      </div>
    );
  }

  render() {
    const { punishments } = this.props;

    if (Object.keys(punishments).length == 0) {
      return <div> None </div>;
    }

    return (
      <div>
        {Object.keys(punishments).map((p) => this.renderPlayer(p, punishments))}
      </div>
    );
  }
}
