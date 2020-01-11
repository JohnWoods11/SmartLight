import React from "react";

import IntensitySlide from "./IntensitySlide";
import ColorSelect from "./ColorSelect";
import LightSwitch from "./LightSwitch";
import Light from "./Light";
import Themes from "./Themes";
import ThemeInput from "./ThemeInput";
import Clock from "./Clock";
import styles from "./Room.module.css";
import LightSelectBox from "./LightSelectBox";

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
      is_on: [false, false, false, false, false, false],
      intensity: [100, 100, 100, 100, 100, 100],
      themes: [],
      theme_input_name: "Off",
      current_theme: null
    };
  }

  addTheme(
    name = [...this.state.theme_input_name],
    isOn = [...this.state.is_on],
    colours = [...this.state.colours],
    intensity = [...this.state.intensity]
  ) {
    let theme = [];
    let themeColours = colours;
    let themeIsOn = isOn;
    let themeIntensity = intensity;
    let themeName = name;
    theme.push(themeName);
    theme.push(themeIsOn);
    theme.push(themeColours);
    theme.push(themeIntensity);
    let s = JSON.stringify(theme);
    return s;
  }

  componentDidMount() {
    let loaded = localStorage.getItem("state");
    if (loaded) {
      let new_state = JSON.parse(loaded);
      let new_themes = new_state.themes;
      let newName = "Enter name here";

      this.setState({
        themes: new_themes,
        theme_input_name: newName
      });
    } else {
      let themes = [...this.state.themes];
      let initialInputValue = [...this.state.theme_input_name];
      themes.push(this.addTheme());
      themes.push(
        this.addTheme(
          "Default",
          [true, true, true, true, true, true],
          this.state.colours,
          this.state.intensity
        )
      );
      initialInputValue = "Enter name here";

      this.setState(
        { themes: themes, theme_input_name: initialInputValue },
        () => this.setLocalStorage()
      );
    }
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

  renderLightSelectBox(i) {
    return (
      <LightSelectBox
        id={i}
        is_on={this.state.is_on[i]}
        switchSlotClicked={() => {
          this.slotClicked(i);
        }}
        color={this.state.colours[i]}
        colorSlotChanged={item => {
          this.slotChanged(item, i);
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
        emitClicked={item => {
          this.themeSlotClicked(item);
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

  renderClock() {
    return <Clock />;
  }

  slotClicked(i) {
    let is_on = [...this.state.is_on];
    is_on[i] = !is_on[i];
    this.setState({ is_on: is_on });

    let s = JSON.stringify(this.state);

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
    console.log(selected_theme);
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
      colours: current_colours,
      current_theme: item.target.value
    });
  }

  themeSlotClicked(item) {
    if (this.state.current_theme) {
      let themes = [...this.state.themes];
      themes.splice(this.state.current_theme, 1);
      this.setState({ themes: themes }, () => this.setLocalStorage());
    } else {
      console.log(
        `this.state.current_theme is null ${this.state.current_theme}`
      );
    }
  }

  themeSelectSlotClicked(item) {
    this.setThemes(item);
  }

  setThemes(item, name) {
    let themes = [...this.state.themes];
    themes.push(this.addTheme());
    console.log(this.state.theme_input_name);
    this.setState({ themes: themes }, () => this.setLocalStorage());
  }

  themeSelectSlotChanged(item) {
    let name = item.target.value;
    this.setState({ theme_input_name: name });
  }

  setLocalStorage() {
    let state = JSON.stringify(this.state);
    localStorage.setItem("state", state);
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
        <div className={styles.selectionContainer}>
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
        {this.renderClock()}
        {this.renderLightSelectBox(1)}
      </div>
    );
  }
}

export default Room;
