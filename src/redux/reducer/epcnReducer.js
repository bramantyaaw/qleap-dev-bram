const initialState = {
  listSubmission: [],
  employeeData: [],
  listApprovalData: [],
  listApprovalHCBP: [],
};

const epcnReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST_SUBMISSION":
      return {
        ...state,
        listSubmission: action.payload,
      };
    case "SET_EMPLOYEE_DATA":
      return {
        ...state,
        employeeData: action.payload,
      };
    case "SET_LIST_APPROVAL":
      return {
        ...state,
        listApprovalData: action.payload,
      };
    case "LIST_APPROVAL_HCBP":
      return {
        ...state,
        listApprovalHCBP: action.payload,
      };
    case "SET_CLEAR_EPCN":
      return {
        // listSubmission: null,
        employeeData: null,
        listApprovalData: null,
        listApprovalHCBP: null,
      };
    default:
      return state;
  }
};
export default epcnReducer;
