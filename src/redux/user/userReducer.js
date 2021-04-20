import userActionTypes from "./userActionTypes";

const INITIAL_VALUE = {
  auth_token: "",
  signed_in: false,
};

const userReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case userActionTypes.USER_SIGNIN:
      return {
        ...state,
        auth_token: action.payload,
        signed_in: true,
      };

    case userActionTypes.USER_SIGNOUT:
      return {
        ...state,
        auth_token: "",
        signed_in: false,
      };

    default:
      return state;
  }
};
export default userReducer;
