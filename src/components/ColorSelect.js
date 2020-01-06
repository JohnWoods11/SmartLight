import React from "react";

import styles from "./ColorSelect.module.css";

function ColorSelect(props) {
  let handleChange = item => {
    if (props.emitChanged) {
      props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${props.emitChanged}`);
    }
  };

  return (
    <input
      type="color"
      value={props.colour}
      className={styles.colorselect}
      onChange={handleChange}
    />
  );
}

export default ColorSelect;
