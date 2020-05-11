import ItemReducer from "./itemReducer";
import * as types from '../actions/types';

describe('Item Reducer', () => {
  it('should return the initial state', () => {
    expect(ItemReducer(undefined, {})).toEqual({})
  })

  it('should handle ADD_ITEM', () => {
    expect(
      ItemReducer({}, {
        type: types.ADD_ITEM,
        payload: { id: 1, amount: 0 }
      })
    ).toEqual({ 1: { id: 1, amount: 0 } })

    expect(
      ItemReducer(
        {
          1: {
            id: 1,
            amount: 0
          }
        },
        {
          type: types.ADD_ITEM,
          payload: { id: 2, amount: 0 }
        }
      )
    ).toEqual({
      1: {
        id: 1,
        amount: 0
      },
      2: {
        id: 2,
        amount: 0
      }
    })
  })

  it('should handle DELETE_ITEM', () => {
    expect(
      ItemReducer({
        1: {
          id: 1,
          amount: 0
        },
        2: {
          id: 2,
          amount: 0
        }
      }, {
          type: types.DELETE_ITEM,
          payload: 2
        })
    ).toEqual({ 1: { id: 1, amount: 0 } })
  })

  it('should handle EDIT_ITEM', () => {
    expect(
      ItemReducer({
        1: {
          id: 1,
          amount: 0
        },
        2: {
          id: 2,
          amount: 0
        }
      }, {
          type: types.EDIT_ITEM,
          payload: { id: 1, amount: 40 }
        })
    ).toEqual({
      1: { id: 1, amount: 40 },
      2: { id: 2, amount: 0 }
    })
  })

})