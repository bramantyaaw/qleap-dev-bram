import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FlatPickr = ({
  setDate,
  minDate,
  maxDate,
  disable,
  dateDate,
  className,
  placeholderText,
  effDate,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [filteredDate, setFilteredDate] = useState("");
  const [filteredMonth, setFilteredMonth] = useState("");
  const [filteredYear, setFilteredYear] = useState("");

  let newDateInput = parseInt(dateDate);

  let initDate = new Date();
  let date_raw = initDate.getDate();
  let month_raw = initDate.getMonth() + 1;
  let year_raw = initDate.getFullYear();

  let newDate = startDate?.getDate();
  let newMonth = startDate?.getMonth() + 1;
  let newYear = startDate?.getFullYear();

  const max = maxDate ? new Date(maxDate) : null;
  const min = minDate ? new Date(minDate) : null;

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
  useEffect(() => {
    getDate();
    getMonth();
    const year = `${newYear}`;
    setFilteredYear(year);
    // eslint-disable-next-line
  }, [startDate]);

  useEffect(() => {
    if (
      filteredDate === "undefined" ||
      filteredMonth === "NaN" ||
      filteredDate === "undefined"
    ) {
      setDate("");
    } else {
      const date = `${filteredYear}-${filteredMonth}-${filteredDate}`;
      setDate(date);
    }
    // eslint-disable-next-line
  }, [filteredYear, filteredMonth, filteredDate]);

  return (
    <>
      {dateDate ? (
        <DatePicker
          dateFormat={`${newDate}/${newMonth}/${newYear}`}
          selected={startDate}
          minDate={
            new Date(year_raw, month_raw - minDate, date_raw + newDateInput)
          }
          onChange={(date) => setStartDate(date)}
          className={`form-control input-default ${className}`}
          placeholderText={placeholderText}
        />
      ) : (
        <DatePicker
          dateFormat={`${newDate}/${newMonth}/${newYear}`}
          selected={startDate}
          minDate={
            effDate ? min : new Date(year_raw, month_raw - minDate, date_raw)
          }
          maxDate={max}
          onChange={(date) => setStartDate(date)}
          className={`form-control input-default ${className}`}
          placeholderText={placeholderText}
        />
      )}
    </>
  );
};
