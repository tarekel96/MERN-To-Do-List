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
    )
    .catch(err => console.log(err));
};

export const addItem = name => dispatch => {
  fetch("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Origin": "*"
    },
    body: JSON.stringify(name)
  })
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: ADD_ITEM,
        payload: item
      })
    )
    .catch(err => console.log(err));
};

export const deleteItem = _id => dispatch => {
  fetch("/items/" + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(item =>
      dispatch({
        type: DELETE_ITEM,
        payload: _id
      })
    )
    .catch(err => console.log(err));
};

export const loadItems = () => {
  return {
    type: ITEMS_LOADING
  };
};
