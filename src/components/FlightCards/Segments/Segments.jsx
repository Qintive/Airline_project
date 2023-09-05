import { FormatDate } from "../../../utils/formatDate";
import { FormatTime } from "../../../utils/formatTime";
import styles from "./Segments.module.css";
import React from "react";

const Segments = (props) => {
  const segments = props.legs.segments || [];

  const numberOfDepartureCities = segments.length;

  const firstSegment = segments[0] || {};
  const lastSegment = segments[numberOfDepartureCities - 1] || {};


  return (
    <div className={styles.segmentContainer}>
      <div className={styles.departureArrival}>
        <span className={styles.cityFlight}>
          <span className={styles.departureCity}>
            {firstSegment.departureCity?.caption}
          </span>
          <span className={styles.arrivalCity}>
            {lastSegment.arrivalCity?.caption}
          </span>
        </span>
        <span className={styles.time}>
          <span className={styles.departureTime}>
            {FormatDate(firstSegment.departureDate)}
          </span>
          <span className={styles.duration}>{FormatTime(props.duration)}</span>
          
          <span className={styles.arrivalTime}>
            {FormatDate(lastSegment.arrivalDate)}
          </span>
        </span>
        <span className={styles.transfer}>
            {numberOfDepartureCities > 1
              ? `Пересадки: ${numberOfDepartureCities - 1}`
              : null}
          </span>
        <span className={styles.airline}>
          {firstSegment.departureCity?.caption === "Москва"
            ? `Рейс выполняет: ${firstSegment.airline.caption}`
            : `Рейс выполняет: ${lastSegment.airline.caption}`}
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
};

export default Segments;