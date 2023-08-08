import React, { useState, useEffect } from "react";

function Timer({ setTime, setTotalTime, isCountDown, timeCountDown, style }) {
  const [seconds, setSeconds] = useState(isCountDown ? timeCountDown : 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => (isCountDown ? seconds - 1 : seconds + 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   setTime(getTime(seconds));
  // }, []); // call setTime whenever seconds changes

  useEffect(() => {
    setTime(getTime(seconds));
    setTotalTime(seconds);
  }, [seconds, setTime, setTotalTime]);

  const getTime = (time) => {
    const result = new Date(time * 1000).toISOString().slice(11, 19);
    return result;
  };

  return (
    <div style={style} className="mt-1">
      {isCountDown && <span>Time Remaining : </span>}
      <span className={`text-danger`}>
        <i className="fe fe-clock me-1 align-middle"></i>
        {getTime(seconds)}
      </span>
    </div>
  );
}

export default Timer;
