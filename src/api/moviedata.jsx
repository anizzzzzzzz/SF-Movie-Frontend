import ROOT_API from "../config/appConfig";

export function filterMovieData(query) {
    return fetch(ROOT_API + "/sf-movie/filter", {
        method : 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(query)
    });
}