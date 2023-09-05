import logo from "../../img/airplane-34786_640.png";
import styles from "./FlightCard.module.css";
import Price from "./Price/Price";
import Segments from "./Segments/Segments";
import React from "react";

const FlightCard = (props) => {
  return (
    <div>
      <div className={styles.blueRectangle}>
        <img src={logo} alt="Flight Logo" className={styles.logo} />
        <Price flight={props.flight} />
      </div>
      {props.flight.legs?.map((legs, index) => (
        <Segments key={index} legs={legs} duration={legs.duration} />
      ))}
      <button className={styles.button}>ВЫБРАТЬ</button>
    </div>
  );
};

export default FlightCard;
