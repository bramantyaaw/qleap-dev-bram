import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiCalendarRange } from "@mdi/js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlatPickrRange = ({
  className,
  top,
  right,
  setNewStartDate,
  setNewEndDate,
  placeholderText,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // startDate
  // const [newStartDate, setNewStartDate] = useState("");

  const [filteredStartDate, setFilteredStartDate] = useState("");
  const [filteredStartMonth, setFilteredStartMonth] = useState("");
  const [filteredStartYear, setFilteredStartYear] = useState("");

  let getNewStartDate = startDate?.getDate();
  let getNewStartMonth = startDate?.getMonth() + 1;
  let getNewStartYear = startDate?.getFullYear();

  const getStartDate = () => {
    if (getNewStartDate >= 1 && getNewStartDate <= 9) {
      return setFilteredStartDate(`0${getNewStartDate}`);
    } else {
      return setFilteredStartDate(`${getNewStartDate}`);
    }
  };

  const getStartMonth = () => {
    if (getNewStartMonth >= 0 && getNewStartMonth <= 9) {
      return setFilteredStartMonth(`0${getNewStartMonth}`);
    } else {
      return setFilteredStartMonth(`${getNewStartMonth}`);
    }
  };

  useEffect(() => {
    getStartDate();
    getStartMonth();
    const year = `${getNewStartYear}`;
    setFilteredStartYear(year);
    // eslint-disable-next-line
  }, [startDate]);

  useEffect(() => {
    if (
      filteredStartDate === "undefined" ||
      filteredStartMonth === "NaN" ||
      filteredStartDate === "undefined"
    ) {
      setNewStartDate("");
    } else {
      const date = `${filteredStartYear}-${filteredStartMonth}-${filteredStartDate}`;
      setNewStartDate(date);
    }
    // eslint-disable-next-line
  }, [filteredStartYear, filteredStartMonth, filteredStartDate]);

  // End Date
  // const [newEndDate, setNewEndDate] = useState("");

  const [filteredEndDate, setFilteredEndDate] = useState("");
  const [filteredEndMonth, setFilteredEndMonth] = useState("");
  const [filteredEndYear, setFilteredEndYear] = useState("");

  let getNewEndDate = endDate?.getDate();
  let getNewEndMonth = endDate?.getMonth() + 1;
  let getNewEndYear = endDate?.getFullYear();

  const getEndDate = () => {
    if (getNewEndDate >= 1 && getNewEndDate <= 9) {
      return setFilteredEndDate(`0${getNewEndDate}`);
    } else {
      return setFilteredEndDate(`${getNewEndDate}`);
    }
  };

  const getEndMonth = () => {
    if (getNewEndMonth >= 0 && getNewEndMonth <= 9) {
      return setFilteredEndMonth(`0${getNewEndMonth}`);
    } else {
      return setFilteredEndMonth(`${getNewEndMonth}`);
    }
  };

  useEffect(() => {
    getEndDate();
    getEndMonth();
    const year = `${getNewEndYear}`;
    setFilteredEndYear(year);
    // eslint-disable-next-line
  }, [endDate]);

  useEffect(() => {
    if (
      filteredEndDate === "undefined" ||
      filteredEndMonth === "NaN" ||
      filteredEndDate === "undefined"
    ) {
      setNewEndDate("");
    } else {
      const date = `${filteredEndYear}-${filteredEndMonth}-${filteredEndDate}`;
      setNewEndDate(date);
    }
    // eslint-disable-next-line
  }, [filteredEndYear, filteredEndMonth, filteredEndDate]);

  return (
    <div className="position-relative">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        className={`form-control ${className} `}
        style={{ border: "1px solid #2F4F4F" }}
        placeholderText={placeholderText}
      />
      <Icon
        path={mdiCalendarRange}
        size={0.8}
        className="position-absolute color-black"
        style={{ top, right, color: "black" }}
      />
    </div>
  );
};

export default FlatPickrRange;
