import invoicesAPI from "../apis/invoices";
import {
  CREATE_INVOICE,
  FETCH_ITEMS,
  DELETE_ITEM,
  EDIT_ITEM,
  ADD_ITEM,

} from "./types";

// invoice action
export const createInvoice = formValues => async dispatch => {
  const response = await invoicesAPI.post("/invoice", { ...formValues });
  dispatch({
    type: CREATE_INVOICE,
    payload: response.data,
  })
};

export const fetchItems = () => async dispatch => {
  const response = await invoicesAPI.get("/invoice");
  dispatch({
    type: FETCH_ITEMS,
    payload: response.data,
  })
};

// line item actions
export const addItem = (item) => dispatch => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

export const deleteItem = (itemId) => dispatch => {
  dispatch({
    type: DELETE_ITEM,
    payload: itemId,
  })
}

export const editItem = (newVal) => dispatch => {
  dispatch({
    type: EDIT_ITEM,
    payload: newVal,
  })
}
