import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";
import Timer from "./Timer.jsx";

class timer extends React.Component {
  render() {
    const { remainingSeconds } = this.props;
    var a = Math.floor(remainingSeconds / 60);
    var b = remainingSeconds % 60;

    const classes = ["timer"];
    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")}>
        <h4>Timer</h4>
        {/*<span className="seconds">{remainingSeconds}</span>*/}
        <span className="seconds">
          {a}:{b < 10 ? 0 : null}
          {b}
        </span>
      </div>
    );
  }
}

export default Timer = StageTimeWrapper(timer);
