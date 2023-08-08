import axios from "axios";

export const profileAction = (token, uid) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/profile/details",
      {
        uid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "SET_DATA_PROFILE", payload: { data } });
  };
};

export const LogoutProfile = () => {
  return (dispatch) => {
    dispatch({ type: "SET_DATA_LOGOUT" });
  };
};

export const attendanceAction = (token, uid, month, year) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/profile/get-attadence",
      {
        uid,
        month,
        year,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "SET_ATTENDANCE", payload: { data } });
  };
};

export const eraFamilyAction = (token, uid) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/profile/era-family",
      {
        uid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: "SET_ERAFAMILY", payload: { data } });
  };
};

export const whatsappAction = () => {
  return async (dispatch) => {
    const data = await axios.post("/send-message-wa-bp");
    return data;
    // dispatch({ type: "SEND_WA", payload: { data } });
  };
};
export const getEmployeePhoto = (token, uid) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "profile/get-employee-photo",
      {
        uid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const newData = data?.data;
    const img64String = newData?.length > 0 && newData[0]?.base64_data;

    const base64Data =
      img64String?.length > 0 ? img64String?.split(",")[1] : "";

    const binaryData = window.atob(base64Data);

    const sizeInBytes = binaryData.length;
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInKB / 1024;

    if (sizeInMB < 3) {
      const arrObjData = newData?.map((data) => {
        let obj = {
          photo: data?.base64_data,
          uid,
          notPhoto: false,
        };
        return obj;
      });
      dispatch({ type: "SET_EMPLOYEES_PHOTO", payload: { arrObjData } });
    } else {
      const arrObjData = newData?.map(() => {
        let obj = {
          notPhoto: true,
          uid,
        };
        return obj;
      });
      dispatch({ type: "SET_EMPLOYEES_PHOTO", payload: { arrObjData } });
    }
  };
};
