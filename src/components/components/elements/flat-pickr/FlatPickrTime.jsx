import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@mdi/react";
import { mdiCalendarRange } from "@mdi/js";

export const FlatPickrTime = ({
  setDate,
  className,
  placeholderText,
  minDate,
  defaultValue,
}) => {
  // const [inputDate, setInputDate] = useState(null);
  const [inputDate, setInputDate] = useState(
    defaultValue ? new Date(defaultValue) : null
  );
  const [filteredDate, setFilteredDate] = useState("");
  const [filteredMonth, setFilteredMonth] = useState("");
  const [filteredYear, setFilteredYear] = useState("");
  const [filteredHours, setFilteredHours] = useState("");
  const [filteredMinutes, setFilteredMinutes] = useState("");

  let newDate = inputDate?.getDate();
  let newMonth = inputDate?.getMonth() + 1;
  let newYear = inputDate?.getFullYear();
  let newHours = inputDate?.getHours();
  let newMinutes = inputDate?.getMinutes();

  const getDate = () => {
    if (newDate >= 1 && newDate <= 9) {
      return setFilteredDate(`0${newDate}`);
    } else {
      return setFilteredDate(`${newDate}`);
    }
  };

  const getMonth = () => {
    if (newMonth >= 0 && newMonth <= 9) {
      return setFilteredMonth(`0${newMonth}`);
    } else {
      return setFilteredMonth(`${newMonth}`);
    }
  };

  const getHours = () => {
    if (newHours >= 0 && newHours <= 9) {
      return setFilteredHours(`0${newHours}`);
    } else {
      return setFilteredHours(`${newHours}`);
    }
  };

  const getMin = () => {
    if (newMinutes >= 0 && newMinutes <= 9) {
      return setFilteredMinutes(`0${newMinutes}`);
    } else {
      return setFilteredMinutes(`${newMinutes}`);
    }
  };

  useEffect(() => {
    getDate();
    getMonth();
    getMin();
    getHours();
    const year = `${newYear}`;
    setFilteredYear(year);
  }, [inputDate]);

  useEffect(() => {
    if (
      filteredDate === "undefined" ||
      filteredMonth === "NaN" ||
      filteredDate === "undefined"
    ) {
      setDate("");
    } else {
      const date = `${filteredYear}-${filteredMonth}-${filteredDate} ${filteredHours}:${filteredMinutes}`;
      setDate(date);
    }
  }, [
    filteredYear,
    filteredMonth,
    filteredDate,
    filteredHours,
    filteredMinutes,
  ]);

  const handleTimeChange = (date) => {
    if (minDate && date && date < minDate) {
      setInputDate(minDate);
    } else {
      setInputDate(date);

      const newDate = date?.getDate();
      const newMonth = date?.getMonth() + 1;
      const newYear = date?.getFullYear();
      const newHours = date?.getHours();
      const newMinutes = date?.getMinutes();

      const formattedDate =
        newDate >= 1 && newDate <= 9 ? `0${newDate}` : `${newDate}`;
      const formattedMonth =
        newMonth >= 0 && newMonth <= 9 ? `0${newMonth}` : `${newMonth}`;
      const formattedHours =
        newHours >= 0 && newHours <= 9 ? `0${newHours}` : `${newHours}`;
      const formattedMinutes =
        newMinutes >= 0 && newMinutes <= 9 ? `0${newMinutes}` : `${newMinutes}`;

      setFilteredDate(formattedDate);
      setFilteredMonth(formattedMonth);
      setFilteredYear(`${newYear}`);
      setFilteredHours(formattedHours);
      setFilteredMinutes(formattedMinutes);
    }
  };

  return (
    <div className="position-relative">
      <DatePicker
        selected={inputDate}
        onChange={handleTimeChange}
        // onChange={(date) => setInputDate(date)}
        timeInputLabel="Time:"
        dateFormat="dd/MM/yyyy h:mm aa"
        minDate={minDate}
        showTimeInput
        className={`form-control ${className}`}
        placeholderText={placeholderText}
        defaultValue={defaultValue}
      />
      <Icon
        path={mdiCalendarRange}
        size={0.8}
        className="position-absolute text-secondary"
        style={{ top: "15", right: "12", color: "secondary" }}
      />
    </div>
  );
};
