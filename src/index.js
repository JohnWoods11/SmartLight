import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class IntensitySlide extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

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
        onChange={this.handleChange}
      />
    );
  }
}

class ColourSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(item) {
    if (this.props.emitChanged) {
      this.props.emitChanged(item);
    } else {
      console.log(`emitChanged is null ${this.props.emitChanged}`);
    }
  }

  render() {
    let select = (
      <input
        type="color"
        value={this.props.colour}
        className="colourselect"
        onChange={this.handleChange}
      />
    );
    return select;
  }
}

class LightSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.emitClicked) {
      this.props.emitClicked();
    } else {
      console.log(`emitClicked is null ${this.props.emitClicked}`);
    }
  }

  render() {
    let status;
    if (this.props.is_on) {
      status = "on";
    } else {
      status = "off";
    }
    return (
      <button
        className="switch"
        onClick={() => {
          this.handleClick();
        }}
      >
        {status}
      </button>
    );
  }
}

class Light extends React.Component {
  handleClick() {
    if (this.props.emitClicked) {
      this.props.emitClicked();
    } else {
      console.log(`emitClicked is null ${this.props.emitClicked}`);
    }
  }

  render() {
    const size = (this.props.intensity / 100) * 40;
    const is_on = this.props.is_on;
    let colour = this.props.colour;
    if (!is_on) {
      colour = "white";
    }
    let button = (
      <button
        className="light"
        style={{ backgroundColor: colour, height: size, width: size }}
        onClick={() => {
          this.handleClick();
        }}
      />
    );

    return button;
  }
}

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

  renderLight(i) {
    return (
      <span className="lightspan">
        <Light
          colour={this.state.colours[i]}
          is_on={this.state.is_on[i]}
          intensity={this.state.intensity[i]}
          emitClicked={() => {
            this.slotClicked(i);
          }}
        />
      </span>
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
        <ColourSelect
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
      <div className="selectionbox">
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
        <div>
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

// ========================================

ReactDOM.render(<Room />, document.getElementById("root"));
