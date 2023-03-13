import { CoordinatesInput, CityState, PostalCode } from "@backend/LocationType";
import axios from "axios";

export const currentWeather = (location: CoordinatesInput | CityState | PostalCode) => axios.get(`/weather/api/current?${location.type == "coordinates" ? `latitude=${location.latitude}&longitude=${location.longitude}` :
    location.type == "postal_code" ? `postalcode=${location.postalCode}` :
        location.type == "city_state" ? `city=${location.city}&state=${location.state}` : ""}`);
export const getTotalRequests = () => axios.get(`/weather/api/requests`);