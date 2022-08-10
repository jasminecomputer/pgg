import { refHandler } from "@blueprintjs/core";
import React from "react";
import "./Collapsible.css";

export default class Collapsible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    history.togglePanel = this.togglePanel.bind(this);
  }
  togglePanel(e) {
    this.setState({ open: !this.state.open });
    document.getElementById(
      "collapsible-header"
    ).className = `collapsible-header ${!this.state.open}`;
  }

  render() {
    const imagePath = "/experiment/images/sample.jpeg";
    const up = "/experiment/images/uptriangle.png";
    return (
      <div>
        <div
          onClick={(e) => this.togglePanel(e)}
          className="collapsible-header false"
          id="collapsible-header"
        >
          {this.props.title}
        </div>
        {this.state.open ? (
          <div className="collapsible-content">{this.props.children}</div>
        ) : null}
      </div>
    );
  }
}
