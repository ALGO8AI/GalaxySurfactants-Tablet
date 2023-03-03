import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import dummyReducer from "./dummyReducer/DummyReducer";
import userReducer from "./userReducer/UserReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["toggle"],
};

const reducers = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

let Store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export default Store;
