// store.js
import { createStore } from "redux";
import rootReducer from "./rootReducer";
import {
  loadStateFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

// Create store from rootReducers and use loadStateFromLocalStorage to overwrite states values
const store = createStore(rootReducer, loadStateFromLocalStorage());

//Listen for store changes and save them to saveToLocalStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
