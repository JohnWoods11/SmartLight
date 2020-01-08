import React from "react";

import IntensitySlide from "./IntensitySlide";
import ColorSelect from "./ColorSelect";
import LightSwitch from "./LightSwitch";
import Light from "./Light";
import Themes from "./Themes";
import ThemeInput from "./ThemeInput";
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
      intensity: [100, 100, 100, 100, 100, 100],
      themes: [],
      theme_input_name: "Enter theme name here",
      current_theme: []
    };
  }

  componentDidMount() {
    let loaded = localStorage.getItem("state");

    let new_state = JSON.parse(loaded);

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

  renderThemes() {
    return (
      <Themes
        themes={this.state.themes}
        emitChanged={item => {
          this.themeSlotChanged(item);
        }}
      />
    );
  }

  RenderThemeInput() {
    return (
      <div>
        <ThemeInput
          input={this.state.theme_input_name}
          emitClicked={(item, name) => {
            this.themeSelectSlotClicked(item, name);
          }}
          emitChanged={item => {
            this.themeSelectSlotChanged(item);
          }}
        />
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

  themeSlotChanged(item) {
    let selected_theme = [this.state.themes[item.target.value]];
    selected_theme = JSON.parse(selected_theme);
    let current_is_on = [...this.state.is_on];
    let current_intensity = [...this.state.intensity];
    let current_colours = [...this.state.colours];
    current_is_on = selected_theme[1];
    current_colours = selected_theme[2];
    current_intensity = selected_theme[3];
    current_colours = selected_theme[2];
    this.setState({
      is_on: current_is_on,
      intensity: current_intensity,
      colours: current_colours
    });
  }

  themeSelectSlotClicked(item) {
    this.setThemes(item);
    let state = JSON.stringify(this.state);
    localStorage.setItem("state", state);
  }

  setThemes(item, name) {
    let themes = [...this.state.themes];
    let theme = [];
    theme.push(this.state.theme_input_name);
    theme.push(this.state.is_on);
    theme.push(this.state.colours);
    theme.push(this.state.intensity);
    let s = JSON.stringify(theme);
    themes.push(s);
    this.setState({ themes: themes });
  }

  themeSelectSlotChanged(item) {
    let name = item.target.value;
    this.setState({ theme_input_name: name });
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
        <div>
          {this.RenderThemeInput()}
          {this.renderThemes()}
        </div>
      </div>
    );
  }
}

export default Room;
