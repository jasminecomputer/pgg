import React from "react";

import TaskResponse from "./TaskResponse";
import TaskStimulus from "./TaskStimulus.jsx";
import "./Task.css";

export default class Task extends React.Component {
  render() {
    return (
      <body className="task-body">
        <div>
          <TaskStimulus {...this.props} />
          <TaskResponse {...this.props} />
        </div>
      </body>
    );
  }
}
