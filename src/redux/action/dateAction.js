import axios from "axios";
export const yearAction = (token, uid) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/profile/get-year-attendance",
      {
        uid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const newData = data?.data;
    const newObjArr = newData.map((data) => {
      const obj = {
        value: data?.year,
        label: data?.year,
      };
      return obj;
    });

    dispatch({ type: "SET_YEAR", payload: { newObjArr } });
  };
};

export const monthAction = (token, uid, year) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/profile/get-month-attendance",
      {
        uid,
        year,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const newMonth = data?.data;
    const newValueArr = newMonth.map((data) => {
      const obj = {
        value: data?.month_number,
        label: data?.month_name,
      };
      return obj;
    });
    dispatch({ type: "SET_MONTH", payload: { newValueArr } });
  };
};

export const cutoffAction = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "/get-cut-off",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "SET_CUTOFF", payload: { data } });
  };
};
