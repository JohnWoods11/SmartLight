import React from "react";

import styles from "./Themes.module.css";
import Schedule from "./Schedule";

function Themes(props) {
  let handleChange = item => {
    if (props.emitChanged) {
      props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${props.emitChanged}`);
    }
  };

  const handleClick = item => {
    if (props.emitClicked) {
      props.emitClicked();
    } else {
      console.log(`emitClicked is null ${props.emitClicked}`);
    }
  };

  const makeList = props.themes.map((
    theme,
    index //TODO remove index id assignment
  ) => (
    <option key={index} value={index}>
      {JSON.parse(theme)[0]}
    </option>
  ));

  let list = (
    <div className={styles.themes}>
      <div className={styles.listContainer}>
        <select className={styles.list} size="5" onChange={handleChange}>
          {makeList}
        </select>
        <button onClick={handleClick}>Remove Theme</button>
      </div>
      <Schedule
        startEmitChanged={props.startEmitChanged}
        endEmitChanged={props.endEmitChanged}
        emitClicked={props.scheduleEmitClicked}
      />
    </div>
  );
  return list;
}

export default Themes;
