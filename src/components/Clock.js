import React from "react";

function Clock(props) {
  return (
    <p>
      {("0" + props.hour).slice(-2)}:{("0" + props.min).slice(-2)}
    </p>
  );
}

export default Clock;
