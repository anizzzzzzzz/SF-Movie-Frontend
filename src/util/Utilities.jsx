export function splitAddresses(address) {
    let regex = /(?:[@,/\-()\\])|(?: at|between|from|to )/;

    let locations = address.split(regex);
    if(!locations.includes(address))
        locations.unshift(address);

    return locations.reverse();
}