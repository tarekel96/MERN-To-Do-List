import {
  ADD_ITEM,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR
} from "./types";

import { returnErrors } from "./error-actions";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // get token from localStorage
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // if token is present, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  fetch("/users/user", {
    method: "GET",
    config
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status == "401") {
        dispatch(returnErrors(res.Msg, res.status));
        dispatch({ type: AUTH_ERROR });
      } else dispatch({ type: USER_LOADED, payload: res.data });
    });

  //     .catch(err => {
  //       console.log(err);
  //       dispatch(returnErrors(err.response.data, err.response.status));
  //       dispatch({ type: AUTH_ERROR });
  //     });
};

// // setup config/headers and token
// export const tokenConfig = getState => {
//   // get token from localStorage
//   const token = getState().auth.token;

//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   // if token is present, add to headers
//   if (token) {
//     config.headers["x-auth-token"] = token;
//   }

//   return config;
// };
