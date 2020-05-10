import _ from "lodash";

import {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_ITEM:
      return _.omit(state, action.payload);

    case EDIT_ITEM:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
}