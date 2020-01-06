import React from "react";

import IntensitySlide from "./IntensitySlide";
import ColorSelect from "./ColorSelect";
import LightSwitch from "./LightSwitch";
import Light from "./Light";

import styles from "./Room.module.css";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colours: [
        "#f6b73c",
        "#f6b73c",
        "#f6b73c",
        "#f6b73c",
        "#f6b73c",
        "#f6b73c"
      ],
      is_on: [false, true, false, true, false, true],
      intensity: [100, 100, 100, 100, 100, 100]
    };
  }

  componentDidMount() {
    let loaded = localStorage.getItem("state");

    let new_state = JSON.parse(loaded);
    console.log(new_state);

    this.setState(new_state);
  }

  renderLight(i) {
    return (
      <div className={styles.light}>
        <Light
          colour={this.state.colours[i]}
          is_on={this.state.is_on[i]}
          intensity={this.state.intensity[i]}
          emitClicked={() => {
            this.slotClicked(i);
          }}
        />
      </div>
    );
  }

  renderSwitch(i) {
    return (
      <LightSwitch
        is_on={this.state.is_on[i]}
        emitClicked={() => {
          this.slotClicked(i);
        }}
      />
    );
  }

  renderColourSelect(i) {
    return (
      <span>
        <ColorSelect
          colour={this.state.colours[i]}
          emitChanged={item => {
            this.slotChanged(item, i);
          }}
        />
      </span>
    );
  }

  renderIntensitySlide(i) {
    return (
      <IntensitySlide
        intensity={this.state.intensity[i]}
        emitChanged={item => {
          this.sliderSlotChanged(item, i);
        }}
      />
    );
  }

  renderSelectionBox(i) {
    return (
      <div className={styles.selectionbox}>
        Light {i + 1}:{this.renderSwitch(i)}
        <br />
        Colour:
        {this.renderColourSelect(i)}
        <br />
        Intensity:
        {this.renderIntensitySlide(i)}
      </div>
    );
  }

  slotClicked(i) {
    let is_on = [...this.state.is_on];
    is_on[i] = !is_on[i];
    this.setState({ is_on: is_on });

    let s = JSON.stringify(this.state);
    console.log(s);

    localStorage.setItem("state", s);
  }

  slotChanged(item, i) {
    let colours = [...this.state.colours];
    colours[i] = item.target.value;
    this.setState({ colours: colours });
  }

  sliderSlotChanged(item, i) {
    let intensity = [...this.state.intensity];
    intensity[i] = item.target.value;
    this.setState({ intensity: intensity });
  }

  render() {
    return (
      <div>
        <div className={styles.lightContainer}>
          {this.renderLight(0)}
          {this.renderLight(1)}
          {this.renderLight(2)}
          {this.renderLight(3)}
          {this.renderLight(4)}
          {this.renderLight(5)}
        </div>
        <br />
        <br />
        <div>
          {this.renderSelectionBox(0)}
          {this.renderSelectionBox(1)}
          {this.renderSelectionBox(2)}
          {this.renderSelectionBox(3)}
          {this.renderSelectionBox(4)}
          {this.renderSelectionBox(5)}
        </div>
      </div>
    );
  }
}

export default Room;
