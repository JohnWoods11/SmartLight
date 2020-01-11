import React from "react";

function Clock(props) {
  let getTime = () => {
    return new Date();
  };

  let time = getTime().toTimeString();

  return <p>{time}</p>;
}

export default Clock;
