import { combineReducers } from "redux";
import { itemReducer } from "./item-reducer.js";
import { modalReducer } from "./modal-reducer";

export default combineReducers({
  item: itemReducer,
  modal: modalReducer
});
