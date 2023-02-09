import { createStore } from "redux";

import initialState from "./initialState";
import reducer from "./reducers";

const store = createStore(reducer, initialState);
console.log(store);

export default store;