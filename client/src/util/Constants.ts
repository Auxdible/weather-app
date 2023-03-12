import {CityState, CoordinatesInput, PostalCode} from "@backend/LocationType";

// Defaults for all location inputs
export const DEFAULT_COORDINATES: CoordinatesInput = {
    type: "coordinates",
    latitude: "",
    longitude: ""
}
export const DEFAULT_CITY_STATE: CityState = {
    type: "city_state",
    city: "",
    state: ""
}
export const DEFAULT_POSTAL_CODE: PostalCode = {
    type: "postal_code",
    postalCode: 0
}
