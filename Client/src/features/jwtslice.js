import { createSlice } from '@reduxjs/toolkit'

export const persistedjwtReducer = createSlice({
  // name of slice (must be unique)
  name: 'jwt',
  initialState: {
    jwtCounter: 0,
  },
  reducers: {
    // action: action handler
    addjwt: (state,action) => {
      state.jwtCounter = action.payload.jwtc;
    },
    // action: action handler
    removejwt: (state,action) => {
      state.jwtCounter = action.payload.jwtc;
    },
    // cartCountSetter: (state) => {
    //   state.itemCounter = state
    // },
  },
})

export const { addjwt, removejwt } = persistedjwtReducer.actions
export default persistedjwtReducer.reducer
