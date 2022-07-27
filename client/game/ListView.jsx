import React from "react";

export default class ListView extends React.Component {
  render() {
    const { players } = this.props;
    const listPlayers = players.map((player, i) => {
      return <li key={i}>{player}</li>;
    });

    if (listPlayers.length > 0) {
      return <div> {listPlayers}</div>;
    } else {
      return <div> None </div>;
    }
  }
}
