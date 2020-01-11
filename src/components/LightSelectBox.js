import React from "react";
import LightSwitch from "./LightSwitch";
import ColorSelect from "./ColorSelect";

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

  let lightSwitch = renderLightSwitch();
  let colorSelect = renderColorSelect();

  return (
    <div>
      Light {props.id + 1}
      {lightSwitch}
      {colorSelect}
    </div>
  );
}

export default LightSelectBox;
