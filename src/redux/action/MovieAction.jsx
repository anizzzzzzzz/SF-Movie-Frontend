import {MOVIE_DATA} from "../constant/ActionTypes";

export const storeMovieData = (movieDatas) => {
    return {
        type : MOVIE_DATA,
        payload: movieDatas
    };
};