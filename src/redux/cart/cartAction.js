import cartActionTypes from "./cartActionTypes";

export function addItem(payload) {
  return { type: cartActionTypes.ITEM_ADD, payload };
}

export function removeItem(payload) {
  return { type: cartActionTypes.ITEM_REMOVE, payload };
}

export function emptyCart() {
  return { type: cartActionTypes.CART_EMPTY };
}
