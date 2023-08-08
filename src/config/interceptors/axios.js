import axios from "axios";
// prod (main)
// axios.defaults.baseURL = "https://qleap.erajaya.com:10443/api/v1";

// dev (staging)
axios.defaults.baseURL = "https://development.erajaya.com:10443/api/v1";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem("refresh_token");
    const ssoStatus = localStorage.getItem("sso");

    if (error.response.status === 401) {
      await axios
        .post("/auth/refresh-token", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res?.status === 400 && refreshToken !== null) {
            localStorage.clear();
            localStorage.setItem("sso", ssoStatus);
            return window.location.reload(true);
          } else if (res?.data?.status === true) {
            const newData = res?.data?.data;
            localStorage.setItem("access_token", newData?.access_token);
            localStorage.setItem("refresh_token", newData?.refresh_token);
            window.location.reload(true);
          } else {
            return res;
          }
        });
    } else {
      return error.response;
    }
  }
);
