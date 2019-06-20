import { TOGGLE } from "../actions/types.js";

const initialState = {
  modal: false
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        modal: !state.modal
      };
    default:
      return state;
  }
};
