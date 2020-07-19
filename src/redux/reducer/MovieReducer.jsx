import {MOVIE_DATA} from "../constant/ActionTypes";

const movieReducer = (state = [], action) => {
    switch (action.type) {
        case MOVIE_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default movieReducer;