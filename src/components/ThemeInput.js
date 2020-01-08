import React from "react";
import styles from "./ThemeInput.module.css";

function ThemeInput(props) {
  let handleClick = item => {
    if (props.emitClicked) {
      props.emitClicked(item);
    } else {
      console.log(`emitClicked is null ${props.emitClicked}`);
    }
  };

  let handleChange = item => {
    if (props.emitChanged) {
      props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${props.emitChanged}`);
    }
  };

  return (
    <div className={styles.themeinput}>
      <input
        className={styles.inputbox}
        type="text"
        value={props.input}
        onChange={handleChange}
      ></input>
      <button className={styles.button} onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

export default ThemeInput;
