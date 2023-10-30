import { createSlice } from '@reduxjs/toolkit'

export const cartCountReducer = createSlice({
  // name of slice (must be unique)
  name: 'cartCount',
  initialState: {
    itemCounter: 0,
  },
  reducers: {
    // action: action handler
    cartUpdate: (state,action) => {
      state.itemCounter = action.payload.quantity;
    },
  },
})

export const { cartUpdate } = cartCountReducer.actions
export default cartCountReducer.reducer
