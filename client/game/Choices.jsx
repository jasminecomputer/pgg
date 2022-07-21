import React from "react";

export default class Choices extends React.Component {
  render() {
    const { choices } = this.props;
    const listChoices = choices.map((choice, i) => {
      return <li key={i}>{choice}</li>;
    });
    return <div> {listChoices}</div>;
  }
}
