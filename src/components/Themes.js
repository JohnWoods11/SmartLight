import React from "react";

import styles from "./Themes.module.css";

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

  //WHICH IS BETTER?

  /*let makeList = () => {
    let list = [];
    props.themes.forEach(element => {
      let theme = JSON.parse(element);
      list.push(<option key={props.themes.legth}>{theme[0]}</option>);
    });
    return list;
  };
  let list;
  list = (
    <select className={styles.list} size="5" onChange={handleChange}>
      {makeList()}
    </select>
  );

  return list;*/

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
      <select className={styles.list} size="5" onChange={handleChange}>
        {makeList}
      </select>
      <button onClick={handleClick}>Remove Theme</button>
    </div>
  );
  return list;
}

export default Themes;
