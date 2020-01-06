import React from "react";

import styles from "./IntensitySlide.module.css";

/*
class IntensitySlide extends React.Component {
  handleChange(item) {
    if (this.props.emitChanged) {
      this.props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${this.props.emitChanged}`);
    }
  }

  render() {
    return (
      <input
        type="range"
        name="luminosity"
        min="0"
        max="100"
        defaultValue={this.props.intensity}
        onChange={()=>{this.handleChange()}}
      />
    );
  }
}*/

function IntensitySlide(props) {
  let handleChange = item => {
    if (props.emitChanged) {
      props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${props.emitChanged}`);
    }
  };

  let otherfunc = item => {
    console.log(item);
    return item;
  };

  return (
    <div className={styles.input}>
      <input
        name="luminosity"
        min="0"
        max="100"
        defaultValue={props.intensity}
        onChange={handleChange}
        type="range"
      />
    </div>
  );
}

export default IntensitySlide;
