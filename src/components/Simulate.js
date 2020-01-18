import React from "react";

//import styles from "./Simulate.module.css";

function Simulate(props) {
  let handleClick = () => {
    if (props.emitClicked) {
      props.emitClicked();
    } else {
      console.log(`emit clicked is null ${props.emitClicked}`);
    }
  };

  return <button onClick={handleClick}>test</button>;
}

export default Simulate;
