import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types.js";

export const getItems = () => dispatch => {
  dispatch(loadItems());
  fetch("/items", {
    method: "GET"
  })
    .then(res => res.json())
    .then(items =>
      dispatch({
        type: GET_ITEMS,
        payload: items
      })
    );
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

export const loadItems = () => {
  return {
    type: ITEMS_LOADING
  };
};
