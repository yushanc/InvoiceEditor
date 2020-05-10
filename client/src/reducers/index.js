import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import inputReducer from "./inputReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  form: formReducer,
  invoice: inputReducer,
  lineItem: itemReducer
});