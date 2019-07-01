import { combineReducers } from "redux";
import { itemReducer } from "./item-reducer.js";
import errorReducer from "./error-reducer.js";
import authReducer from "./auth-reducer.js";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});
