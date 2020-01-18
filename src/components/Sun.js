import React from "react";
import styles from "./Sun.module.css";

function Sun(props) {
  let intensity = () => {
    let hour = props.hour;
    if (hour > 4 && hour <= 12) {
      return (100 / 8) * (hour - 4);
    } else if (hour > 12 && hour < 20) {
      return (100 / 8) * (20 - hour);
    } else {
      return 0;
    }
  };
  intensity = intensity();
  let size = intensity / 2 + 40;

  return (
    <div className={styles.container}>
      <button className={styles.sun} style={{ height: size, width: size }}>
        {intensity}%
      </button>
    </div>
  );
}

export default Sun;
