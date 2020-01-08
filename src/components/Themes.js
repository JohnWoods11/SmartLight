import React from "react";

import styles from "./Themes.module.css";
import { element } from "prop-types";

function Themes(props) {
  let handleChange = item => {
    if (props.emitChanged) {
      props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${props.emitChanged}`);
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
    <select className={styles.list} size="5" onChange={handleChange}>
      {makeList}
    </select>
  );
  return list;
}

export default Themes;
