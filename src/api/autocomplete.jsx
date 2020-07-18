import ROOT_API from "../config/appConfig";

export function autocomplete(query) {
    return fetch(ROOT_API + '/sf-movie/autocomplete', {
        method : 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(query)
    });
}