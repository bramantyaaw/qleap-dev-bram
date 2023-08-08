import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const persistConfig = {
  key: "login-user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const globalStore = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(globalStore);

// console.log(globalStore.getState());
export { globalStore, persistor };
