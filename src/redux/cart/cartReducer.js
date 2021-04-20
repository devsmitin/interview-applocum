import cartActionTypes from "./cartActionTypes";

const INITIAL_VALUE = [];

const cartReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case cartActionTypes.ITEM_ADD:
      return state.concat([action.payload]);

    case cartActionTypes.ITEM_REMOVE:
      return state.filter((item) => item !== action.payload);

    case cartActionTypes.CART_EMPTY:
      return (state = []);

    default:
      return state;
  }
};
export default cartReducer;
