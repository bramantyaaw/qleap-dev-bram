import axios from "axios";

export const loginAction = (email, password) => {
  return async (dispatch) => {
    const { data } = await axios.post("/auth/request-token", {
      email,
      password,
    });

    const newData = data?.data;
    const photoData = newData?.map((data) => data?.photo);
    dispatch({ type: "setDataLogin", payload: { photoData } });
    return data;
  };
};

export const loginActionWithoutSSO = (nik, password) => {
  return async (dispatch) => {
    const { data } = await axios.post("/auth/login-non-sso", {
      nik,
      password,
    });
    const newData = data?.data;
    const photoData = newData?.map((data) => data?.photo);
    dispatch({ type: "SET_DATA_LOGIN_WITHOUT_SSO", payload: { photoData } });
    return data;
  };
};

export const LogoutEmail = (refresh_token) => {
  return async (dispatch) => {
    const { data } = await axios.post("/auth/logout", {
      refresh_token,
    });
    const newData = data?.data;
    dispatch({ type: "SET_DATA_LOGOUT", payload: { newData } });
  };
};
