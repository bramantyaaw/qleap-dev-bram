import axios from "axios";

const urlGetFaq = "/services/get-faq-list";

export const faqAction = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(urlGetFaq, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "SET_DATA_FAQ", payload: { data } });
  };
};
