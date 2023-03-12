// 'type' is used to be able to figure out which input is being used


// CoordinatesInput is used for when coordinates are being typed out in the input box. Not parsed as a number.
export interface CoordinatesInput {
    type: "coordinates";
    latitude: string,
    longitude: string
}

// Coordinates is a parsed latitude and longitude used for reverse geolocation and obtaining the weather data.
export interface Coordinates {
    latitude: number;
    longitude: number;
}

// CityState is a string of city and an optional state.
export interface CityState {
    type: "city_state";
    city: string;
    state: string;
}

// PostalCode is a number containing a (expected to be valid, if not error will be thrown) postal code.
export interface PostalCode {
    type: "postal_code";
    postalCode: number;
}