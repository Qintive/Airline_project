import jsonData from "../../data/flights.json";
import styles from "./ContainerFlightCard.module.css";
import FlightCard from "./FlightCard";
import React, { useState, useEffect } from "react";

const ContainerFlightCard = () => {
  const allFlights = jsonData.result.flights;
  const [visibleFlights, setVisibleFlights] = useState(2);
  const [currentFilter, setCurrentFilter] = useState("priceAsc");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [showNonStop, setShowNonStop] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState("");

  const showMoreFlights = () => {
    setVisibleFlights(visibleFlights + 2);
  };

  const getTotalDuration = (flight) => {
    let totalDuration = 0;
    flight.legs.forEach((leg) => {
      totalDuration += leg.duration;
    });
    return totalDuration;
  };

  const filterAndSortFlights = () => {
    let filtered = [...allFlights];

    switch (currentFilter) {
      case "priceAsc":
        filtered.sort(
          (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
        );
        break;
      case "priceDesc":
        filtered.sort(
          (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
        );
        break;
      case "duration":
        filtered.sort(
          (a, b) => getTotalDuration(a.flight) - getTotalDuration(b.flight)
        );
        break;
      default:
        break;
    }

    if (showNonStop) {
      filtered = filtered.filter((flight) => {
        const segments = flight.flight.legs[0].segments || [];
        return segments.length === 1;
      });
    }

    if (selectedAirline) {
      filtered = filtered.filter((flight) => {
        const firstSegment = flight.flight.legs[0].segments[0];
        const airlineCaption =
          firstSegment.departureCity?.caption === "Москва"
            ? firstSegment.airline?.caption
            : firstSegment.airline?.caption;
        return airlineCaption === selectedAirline;
      });
    }

    return filtered.slice(0, visibleFlights);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleShowNonStopChange = () => {
    setShowNonStop(!showNonStop);
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirline(airline);
  };

  useEffect(() => {
    setFilteredFlights(filterAndSortFlights());
  }, [currentFilter, visibleFlights, showNonStop, selectedAirline]);

  const getUniqueAirlines = () => {
    const airlines = new Set();
    allFlights.forEach((flight) => {
      const airlineCaption = flight.flight.legs[0].segments[0].airline.caption;
      airlines.add(airlineCaption);
    });
    return Array.from(airlines);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <h3 className={styles.sectionTitle}>Сортировка</h3>
          <div className={styles.filterItem}>
            <label>
              <input
                type="radio"
                name="filter"
                value="priceAsc"
                checked={currentFilter === "priceAsc"}
                onChange={() => handleFilterChange("priceAsc")}
              />
              По возрастанию цены
            </label>
          </div>
          <div className={styles.filterItem}>
            <label>
              <input
                type="radio"
                name="filter"
                value="priceDesc"
                checked={currentFilter === "priceDesc"}
                onChange={() => handleFilterChange("priceDesc")}
              />
              По убыванию цены
            </label>
          </div>
          <div className={styles.filterItem}>
            <label>
              <input
                type="radio"
                name="filter"
                value="duration"
                checked={currentFilter === "duration"}
                onChange={() => handleFilterChange("duration")}
              />
              По времени в пути
            </label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <h3 className={styles.sectionTitle}>Фильтр</h3>
          <div className={styles.filterItem}>
            <label>
              <input
                type="checkbox"
                checked={showNonStop}
                onChange={handleShowNonStopChange}
              />
              Без пересадок
            </label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <h3 className={styles.sectionTitle}>Авиакомпании</h3>
          <div className={styles.airlineFilter}>
            {getUniqueAirlines().map((airline, index) => (
              <div key={index} className={styles.filterItem}>
                <label>
                  <input
                    type="checkbox"
                    value={airline}
                    checked={selectedAirline === airline}
                    onChange={() => handleAirlineChange(airline)}
                  />
                  {airline}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.flights}>
        {filteredFlights.map((flight, index) => (
          <FlightCard key={index} flight={flight.flight} />
        ))}
        <span className={styles.showMore}>
          {visibleFlights < allFlights.length && (
            <button onClick={showMoreFlights}>Показать еще</button>
          )}
        </span>
      </div>
    </div>
  );
};

export default ContainerFlightCard;
