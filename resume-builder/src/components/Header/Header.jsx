import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import heroSectionSVG from "../../assets/heroSectionSVG.svg";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>
          Unleash Your Potential with our <span>Resume</span> Builder!
        </h1>
        <p className={styles.para}>Craft Your Career Journey for free </p>
        {/* <button className={styles.heroSectionCTA}> */}
        <Link to="/resume">Get Started</Link>
        {/* </button> */}
      </div>
      <div className={styles.imgContainer}>
        <img src={heroSectionSVG} alt="Resume" />
      </div>
    </div>
  );
}

export default Header;
