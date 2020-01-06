import React from "react";

import styles from "./Light.module.css";

function Light(props) {
  let handleClick = item => {
    if (props.emitClicked) {
      props.emitClicked();
    } else {
      console.log(`emitClicked is null ${props.emitClicked}`);
    }
  };

  const size = (props.intensity / 100) * 40;
  const is_on = props.is_on;
  let colour = props.colour;
  if (!is_on) {
    colour = "white";
  }
  return (
    <button
      className={styles.light}
      style={{ backgroundColor: colour, height: size, width: size }}
      onClick={handleClick}
    />
  );
}

export default Light;
