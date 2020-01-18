import React from "react";
import LightSwitch from "./LightSwitch";
import ColorSelect from "./ColorSelect";
import IntensitySlide from "./IntensitySlide";

import styles from "./LightSelectBox.module.css";

function LightSelectBox(props) {
  let renderLightSwitch = () => {
    return (
      <LightSwitch
        is_on={props.is_on}
        emitClicked={() => {
          props.switchSlotClicked();
        }}
      ></LightSwitch>
    );
  };
  let renderColorSelect = () => {
    return (
      <ColorSelect
        colour={props.color}
        emitChanged={item => {
          props.colorSlotChanged(item);
        }}
      />
    );
  };

  let renderIntensitySlide = () => {
    return (
      <IntensitySlide
        intensity={props.intensity}
        emitChanged={item => props.intensitySlotChanged(item)}
      ></IntensitySlide>
    );
  };

  let lightSwitch = renderLightSwitch();
  let colorSelect = renderColorSelect();
  let intensitySlide = renderIntensitySlide();

  return (
    <div className={styles.selectbox}>
      <h4 className={styles.header}>
        Light {props.id + 1} {lightSwitch}
      </h4>
      <div>Colour: {colorSelect}</div>
      <div>Intensity: {intensitySlide}</div>
    </div>
  );
}

export default LightSelectBox;
