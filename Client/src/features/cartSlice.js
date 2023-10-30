import { createSlice } from '@reduxjs/toolkit'

export const persistedCartReducer = createSlice({
  // name of slice (must be unique)
  name: 'cart',
  initialState: {
    itemCounter: 0,
  },
  reducers: {
    // action: action handler
    addToCart: (state,action) => {
      state.itemCounter += action.payload.quantity;
    },
    // action: action handler
    removeFromCart: (state,action) => {
      state.itemCounter -= action.payload.quantity;
    },
    // cartCountSetter: (state) => {
    //   state.itemCounter = state
    // },
  },
})

export const { addToCart, removeFromCart } = persistedCartReducer.actions
export default persistedCartReducer.reducer
