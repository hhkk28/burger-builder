import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: data,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authentication = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const signUpInfo = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const myApiKey = " AIzaSyCUXNgh0Ywc_4jUKGSyyXff8RMaDuaFOz8";
    axios
      .post(url + myApiKey, signUpInfo)
      .then((response) => {
        dispatch(authSuccess(response.data));
        dispatch(authenticationTimeOut());
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error.message));
      });
  };
};

export const authenticationTimeOut = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, 3600000);
  };
};
