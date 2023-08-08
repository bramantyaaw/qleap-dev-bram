import axios from "axios";

export const superiorAction = (token) => {
  return async () => {
    const { data } = await axios.get("/services/get-superior", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
};

export const superSuperiorAction = (token) => {
  return async () => {
    const { data } = await axios.get("/services/get-super-superior", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
};
