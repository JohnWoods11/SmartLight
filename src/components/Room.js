import React from "react";

import Light from "./Light";
import Themes from "./Themes";
import ThemeInput from "./ThemeInput";
import Clock from "./Clock";
import styles from "./Room.module.css";
import LightSelectBox from "./LightSelectBox";
import Simulate from "./Simulate";
import Sun from "./Sun";

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
      current_theme: null,
      schedule: [],
      scheduleStart: null,
      scheduleEnd: null,
      currentHour: 0,
      currentMin: 0,
      sunIntensity: null
    };
  }

  componentDidMount() {
    let loaded = localStorage.getItem("state");
    if (loaded) {
      let new_state = JSON.parse(loaded);
      let new_themes = new_state.themes;
      let newSchedule = new_state.schedule;
      let newName = "Enter name here";

      this.setState({
        themes: new_themes,
        schedule: newSchedule,
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

      let schedule = [];
      for (let i = 0; i < 24; i++) {
        let hour = [];
        for (let i = 0; i < 60; i++) {
          let minute = 0;
          hour.push(minute);
        }
        schedule.push(hour);
      }

      this.setState(
        {
          themes: themes,
          theme_input_name: initialInputValue,
          schedule: schedule
        },
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

  renderLightSelectBox(i) {
    return (
      <LightSelectBox
        id={i}
        is_on={this.state.is_on[i]}
        color={this.state.colours[i]}
        intensity={this.state.intensity[i]}
        switchSlotClicked={() => {
          this.slotClicked(i);
        }}
        colorSlotChanged={item => {
          this.slotChanged(item, i);
        }}
        intensitySlotChanged={item => {
          this.sliderSlotChanged(item, i);
        }}
      />
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
        startEmitChanged={item => {
          this.scheduleStartSlotChanged(item);
        }}
        endEmitChanged={item => {
          this.scheduleEndSlotChanged(item);
        }}
        scheduleEmitClicked={item => {
          this.scheduleSlotClicked(item);
        }}
      />
    );
  }

  RenderThemeInput() {
    return (
      <ThemeInput
        input={this.state.theme_input_name}
        emitClicked={(item, name) => {
          this.themeSelectSlotClicked(item, name);
        }}
        emitChanged={item => {
          this.themeSelectSlotChanged(item);
        }}
      />
    );
  }

  renderSimulate() {
    return (
      <Simulate
        emitClicked={item => {
          this.simulateSlotClicked(item);
        }}
      ></Simulate>
    );
  }

  renderClock() {
    return <Clock hour={this.state.currentHour} min={this.state.currentMin} />;
  }

  renderSun() {
    return (
      <Sun
        hour={this.state.currentHour}
        emitChanged={item => {
          this.sunSlotChanged(item);
        }}
      />
    );
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
    let current_is_on = [...this.state.is_on];
    let current_intensity = [...this.state.intensity];
    let current_colours = [...this.state.colours];
    current_is_on = selected_theme[1];
    current_colours = selected_theme[2];
    current_intensity = selected_theme[3];
    this.setState(
      {
        is_on: current_is_on,
        intensity: current_intensity,
        colours: current_colours,
        current_theme: item.target.value
      },
      () => this.setLocalStorage()
    );
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

  scheduleStartSlotChanged(item) {
    let scheduleStart = item.target.value;
    this.setState({ scheduleStart: scheduleStart });
  }

  scheduleEndSlotChanged(item) {
    let scheduleEnd = item.target.value;
    console.log(item.target.value);
    this.setState({ scheduleEnd: scheduleEnd });
  }

  scheduleSlotClicked(item) {
    if (!this.state.scheduleStart || !this.state.scheduleEnd) {
      console.log(
        `scheduleStart or scheduleEnd is null: ${this.state.scheduleStart}, ${this.state.scheduleEnd}`
      );
      alert(`You must select a scheduled start and end time for your theme`);
      return;
    }
    let startHour = parseInt(this.state.scheduleStart.split(":")[0], 10);
    let startMin = parseInt(this.state.scheduleStart.split(":")[1], 10);
    let endHour = parseInt(this.state.scheduleEnd.split(":")[0], 10);
    let endMin = parseInt(this.state.scheduleEnd.split(":")[1], 10);

    let newSchedule = [...this.state.schedule];
    for (let h = startHour; h <= startHour + 24; h++ % 24) {
      for (let m = startMin; m < 60; m++) {
        if (h === endHour && m === endMin) {
          this.setState({ schedule: newSchedule }, () =>
            this.setLocalStorage()
          );
          return;
        } else {
          newSchedule[h][m] = this.state.current_theme;
        }
      }
    }
  }

  themeSelectSlotClicked(item) {
    this.setThemes(item);
  }

  sunSlotChanged(item) {
    console.log(item);
  }

  simulateSlotClicked(item) {
    let i = 0;
    let timer = setInterval(() => this.test(++i, timer), 5);
  }

  test(i, timer) {
    let hour = parseInt((i / 60) % 24);
    let min = i % 60;
    let themeKey = this.state.schedule[hour][min];
    if (hour === 0 && min === 0) {
      clearInterval(timer);
    }
    let selectedTheme = this.state.themes[themeKey];
    selectedTheme = JSON.parse(selectedTheme);
    let current_is_on = [...this.state.is_on];
    let current_intensity = [...this.state.intensity];
    let current_colours = [...this.state.colours];
    current_is_on = selectedTheme[1];
    current_colours = selectedTheme[2];
    current_intensity = selectedTheme[3];
    this.setState(
      {
        currentHour: hour,
        currentMin: min,
        is_on: current_is_on,
        intensity: current_intensity,
        colours: current_colours,
        current_theme: themeKey
      },
      () => this.setLocalStorage()
    );
  }

  simulate() {
    let now = new Date();
    let themeKey = this.state.schedule[now.getHours][now.getMinutes];
    let selectedTheme = this.state.themes[themeKey];
    selectedTheme = JSON.parse(selectedTheme);
    let current_is_on = [...this.state.is_on];
    let current_intensity = [...this.state.intensity];
    let current_colours = [...this.state.colours];
    current_is_on = selectedTheme[1];
    current_colours = selectedTheme[2];
    current_intensity = selectedTheme[3];
    this.setState(
      {
        currentHour: now.getHours,
        currentMin: now.getMinutes,
        is_on: current_is_on,
        intensity: current_intensity,
        colours: current_colours,
        current_theme: themeKey
      },
      () => this.setLocalStorage()
    );
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
        <div className={styles.selectionContainer}>
          {this.renderLightSelectBox(0)}
          {this.renderLightSelectBox(1)}
          {this.renderLightSelectBox(2)}
          {this.renderLightSelectBox(3)}
          {this.renderLightSelectBox(4)}
          {this.renderLightSelectBox(5)}
        </div>
        {this.RenderThemeInput()}
        <div className={styles.sunThemeContainer}>
          {this.renderThemes()}
          {this.renderSun()}
        </div>
        {this.renderClock()}
        {this.renderSimulate()}
      </div>
    );
  }
}

export default Room;
