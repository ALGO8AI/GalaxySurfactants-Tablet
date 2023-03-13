import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import applicationReducer from "./applicationReducer/applicationReducer";
import toggleReducer from "./toggleReducer/toggleReducer";
import userReducer from "./userReducer/UserReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["toggle"],
};

const reducers = combineReducers({
  user: userReducer,
  app: applicationReducer,
  toggle: toggleReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

let Store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export default Store;
