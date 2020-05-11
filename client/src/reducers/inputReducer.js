import {
  CREATE_INVOICE,
  FETCH_ITEM,
  FETCH_ITEMS,
} from "../actions/types";

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INVOICE:
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_ITEM:
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_ITEMS:
      const mapItems = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {})
      return { ...state, ...mapItems };

    default:
      return state;
  }
}