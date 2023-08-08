const initialState = {
  monthData: [],
  yearData: [],
  cutoffData: [],
};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return {
        ...state,
        monthData: action.payload,
      };
    case "SET_YEAR":
      return {
        ...state,
        yearData: action.payload,
      };
    case "SET_CUTOFF":
        return {
          ...state,
          cutoffData: action.payload,
        };
    default:
      return state;
  }
};
export default dateReducer;
