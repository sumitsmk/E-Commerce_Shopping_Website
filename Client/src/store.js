import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import cartSlice from './features/cartSlice'
import cartReducer from './features/cartSlice'
import jwtReducer from './features/jwtslice'
import storage from 'redux-persist/lib/storage/session'; 
import { persistStore, persistReducer } from 'redux-persist';
import { persistedSearchReducer } from './features/searchSlice'
import  cartCountReducer  from './features/cartCountSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedjwtReducer = persistReducer(persistConfig, jwtReducer);

// create a new store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: persistedCartReducer,
    cartCount:cartCountReducer,
    jwt: persistedjwtReducer,
    // cart: cartSlice,
  },
})

export const persistor = persistStore(store);

