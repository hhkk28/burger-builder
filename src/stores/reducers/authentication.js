import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: false,
  userId: null,
  token: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.authData.localId,
        token: action.authData.idToken,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
