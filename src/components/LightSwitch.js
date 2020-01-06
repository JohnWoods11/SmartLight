import React from "react";

import styles from "./LightSwitch.module.css";

function LightSwitch(props) {
  let handleClick = item => {
    if (props.emitClicked) {
      props.emitClicked();
    } else {
      console.log(`emitClicked is null ${props.emitClicked}`);
    }
  };

  let status;
  if (props.is_on) {
    status = "on";
  } else {
    status = "off";
  }
  return (
    <button className={styles.switch} onClick={handleClick}>
      {status}
    </button>
  );
}

export default LightSwitch;
