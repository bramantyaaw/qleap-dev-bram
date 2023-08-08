const initialState = {
  profileData: [],
  attendanceData: [],
  erafamilyData: [],
  messageData: [],
  employeePhoto: [],
};

const profileReducer = (state = initialState, action) => {
  const arrEmployee = state?.employeePhoto;

  switch (action.type) {
    case "SET_DATA_PROFILE":
      return {
        ...state,
        profileData: action.payload,
      };
    case "SET_DATA_LOGOUT":
      return {
        profileData: null,
      };
    case "SET_ATTENDANCE":
      return {
        ...state,
        attendanceData: action.payload,
      };
    case "SET_ERAFAMILY":
      return {
        ...state,
        erafamilyData: action.payload,
      };
    case "SEND_WA":
      return {
        messageData: action.payload,
      };
    case "SET_EMPLOYEES_PHOTO":
      if (arrEmployee?.length === 20) {
        arrEmployee?.shift();
      }
      return {
        ...state,
        employeePhoto:
          arrEmployee?.length > 0
            ? [...arrEmployee, ...action.payload?.arrObjData]
            : action.payload?.arrObjData,
      };

    default:
      return state;
  }
};
export default profileReducer;
