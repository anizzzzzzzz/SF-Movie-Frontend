import {createStore} from "redux";
import allReducers from "../reducer/Index";

export const store = createStore(allReducers);