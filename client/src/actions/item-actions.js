import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types.js";

export const getItems = () => {
  return {
    type: GET_ITEMS
  };
};

export const addItem = ({ item, id }) => {
  return {
    type: ADD_ITEM,
    payload: {
      name: item,
      id
    }
  };
};

export const deleteItem = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};
