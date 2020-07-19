export function forwardGeocodeLocation(location) {
    let params = {format:"json", addressdetails:1, limit:1, street:location, city:'San Francisco'};
    let query = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');

    let url = 'https://nominatim.openstreetmap.org?' + query;
    console.log(url);
    return fetch(url);
}