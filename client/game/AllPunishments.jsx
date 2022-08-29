import { refHandler } from "@blueprintjs/core";
import React from "react";
import "./AllPunishments.css";

export default class AllPunishments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    history.togglePanel = this.togglePanel.bind(this);
  }
  togglePanel(e) {
    this.setState({ open: !this.state.open });
    document.getElementById("all-header").className = `all-header ${!this.state
      .open}`;
  }

  render() {
    return (
      <div>
        <div className="all-content">{this.props.children}</div>
      </div>
    );
  }
}
