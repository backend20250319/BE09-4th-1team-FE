import styles from "../styles/Title.module.css";
import React from "react";

const Title = (props) => {
  return (
    <div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.subtitle}>{props.subtitle}</div>
    </div>
  );
};

export default Title;
