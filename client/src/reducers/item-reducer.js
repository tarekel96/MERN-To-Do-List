import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types.js";

const initalState = {
  items: [
    {
      name: "Do laundry",
      id: uuid()
    },
    {
      name: "Take out the trash",
      id: uuid()
    },
    {
      name: "Clean the garage",
      id: uuid()
    }
  ]
};
export const itemReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case ADD_ITEM:
      return {};
    // case ADD_ITEM:
    //   return [
    //     ...initalState.items,
    //     {
    //       id: uuid(),
    //       name: action.name
    //     }
    //   ];
    default:
      return state;
  }
};

// export default itemReducer;
