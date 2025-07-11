// components/TitleSection.js
import React from "react";
import styles from "@/app/(features)/suggestion/[id]/styles/TitleSection.module.css";

const TitleSection = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default TitleSection;
