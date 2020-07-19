import {combineReducers} from "redux";
import movieReducer from "./MovieReducer";

const allReducers = combineReducers({
    loadMovieData : movieReducer
});

export default allReducers;