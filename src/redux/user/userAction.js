import userActionTypes from "./userActionTypes";

export function signin(payload) {
  return { type: userActionTypes.USER_SIGNIN, payload };
}

export function signout() {
  return { type: userActionTypes.USER_SIGNOUT };
}
