import React from "react";
import styles from "./Sun.module.css";

class Sun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: props.hour
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.hour !== props.hour) {
      return {
        hour: props.hour
      };
    }
    return null;
  }

  componentDidUpdate() {
    this.handleChange();
  }

  handleChange() {
    if (this.props.emitChanged) {
      this.props.emitChanged(this.intensity());
    } else {
      console.log(`emitChanged is null ${this.props.emitChanged}`);
    }
  }

  intensity() {
    let hour = this.state.hour;
    if (hour > 4 && hour <= 12) {
      return (100 / 8) * (hour - 4);
    } else if (hour > 12 && hour < 20) {
      return (100 / 8) * (20 - hour);
    } else {
      return 0;
    }
  }

  render() {
    let intensity = this.intensity();
    let size = intensity / 2 + 40;
    return (
      <div className={styles.container}>
        <button className={styles.sun} style={{ height: size, width: size }}>
          {intensity}%
        </button>
      </div>
    );
  }
}

export default Sun;
