import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (localId, idToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    localId: localId,
    idToken: idToken,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("expiryTime");
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
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("localId", response.data.localId);
        const expiryTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expiryTime", expiryTime);
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(authenticationTimeOut(response.data.expiresIn * 1000));
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error.message));
      });
  };
};

export const authenticationTimeOut = (expiryTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiryTime);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authStateCheck = () => {
  return (dispatch) => {
    const expiryTime = localStorage.getItem("expiryTime");
    const idToken = localStorage.getItem("idToken");
    const localId = localStorage.getItem("localId");
    const timeDifference = new Date(expiryTime) - new Date();
    if (!idToken) {
      dispatch(authLogout());
    } else {
      if (timeDifference < 0) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(localId, idToken));
        dispatch(authenticationTimeOut(timeDifference));
      }
    }
  };
};
