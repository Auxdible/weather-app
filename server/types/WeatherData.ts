import { Condition, Wind } from "./Weather";

// Weather data, containing the Condition, Wind, min/max temp, avg temp, feels like, humidity, city, state, country, sunset, sunrise, and current time, provided by openstreetmap and openweathermap.
// Credit to: https://openweathermap.org/
// Credit to: https://wiki.openstreetmap.org/wiki/About_OpenStreetMap

export default interface WeatherData {
    condition: Condition;
    wind: Wind;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    sunrise: number;
    sunset: number;
    time: number;
    state: string | undefined;
    country : string;
    city: string;
}