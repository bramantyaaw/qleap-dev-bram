const initialState = {
  loginData: [],
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setDataLogin":
      return {
        ...state,
        loginData: action.payload,
      };
    case "SET_DATA_LOGIN_WITHOUT_SSO":
      return {
        ...state,
        loginData: action.payload,
      };
    case "SET_DATA_LOGOUT":
      return {
        loginData: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
