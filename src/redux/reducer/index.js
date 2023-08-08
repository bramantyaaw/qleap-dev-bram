import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import faqReducer from "./faqReducer";
import dateReducer from "./dateReducer";
import epcnReducer from "./epcnReducer";

const rootReducer = combineReducers({
  authReducer,
  profileReducer,
  faqReducer,
  dateReducer,
  epcnReducer,
});

export default rootReducer;
