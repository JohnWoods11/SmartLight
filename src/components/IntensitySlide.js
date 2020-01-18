import React from "react";

import styles from "./IntensitySlide.module.css";

function IntensitySlide(props) {
  let handleChange = item => {
    if (props.emitChanged) {
      props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${props.emitChanged}`);
    }
  };

  return (
    <div className={styles.input}>
      <input
        className={styles.slide}
        name="luminosity"
        min="0"
        max="100"
        value={props.intensity}
        onChange={handleChange}
        type="range"
      />
    </div>
  );
}

export default IntensitySlide;
