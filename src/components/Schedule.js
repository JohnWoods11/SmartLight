import React from "react";

import styles from "./Schedule.module.css";

function Schedule(props) {
  let startHandleChange = item => {
    if (props.startEmitChanged) {
      props.startEmitChanged(item);
    } else {
      console.log(`startEmitChanged is null ${props.startEmitChanged}`);
    }
  };

  let endHandleChange = item => {
    if (props.endEmitChanged) {
      props.endEmitChanged(item);
    } else {
      console.log(`endEmitChanged is null ${props.EndemitChanged}`);
    }
  };

  let handleClick = item => {
    if (props.emitClicked) {
      props.emitClicked();
    } else {
      console.log(`emitClicked is null ${props.emitClicked}`);
    }
  };

  return (
    <div className={styles.schedule}>
      <input
        className={styles.scheduleElement}
        type="time"
        onChange={startHandleChange}
      ></input>
      <input
        className={styles.scheduleElement}
        type="time"
        onChange={endHandleChange}
      ></input>
      <button className={styles.scheduleElement} onClick={handleClick}>
        schedule theme
      </button>
    </div>
  );
}

export default Schedule;
