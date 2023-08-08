import axios from "axios";

export const getListSubmission = (token, uid) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/team/list-submission",
      {
        // uid,
        uid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: "SET_LIST_SUBMISSION", payload: { data } });
  };
};

export const getEmployeeAction = (token, uid) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/epcn/emp-detail",
      {
        uid,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "SET_EMPLOYEE_DATA", payload: { data } });
  };
};

// List Approval SUp
export const getListApproval = (token, uid, status) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/team/list-approval",
      {
        // uid,
        uid,
        status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: "SET_LIST_APPROVAL", payload: { data } });
    // return data;
  };
};

// List Approval HCBP
export const approvalHCBP = (token, uid, status) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/main-desk/get-epcn-list",
      {
        // uid,
        uid,
        status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: "LIST_APPROVAL_HCBP", payload: { data } });
    // return data;
  };
};

export const clearEPCN = () => {
  return (dispatch) => {
    dispatch({ type: "SET_CLEAR_EPCN" });
  };
};
