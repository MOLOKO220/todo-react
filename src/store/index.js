import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { mainReducer } from "./mainReducer";
import { idCaunterReducer } from "./idCaunterReducer";

const rootReducer = combineReducers({
  main: mainReducer,
  id: idCaunterReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
