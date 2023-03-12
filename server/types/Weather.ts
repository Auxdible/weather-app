
// Condition object stored inside the WeatherData, containing all the essential information about the weather condition provided by OpenWeatherMap (Credit to: https://openweathermap.org/)
export interface Condition {
    id: number;
    main: string;
    description: string;
    icon_id: string;
}

// Wind object stored inside the WeatherData, containing all the essential information about the wind provided by OpenWeatherMap (Credit to: https://openweathermap.org/)
export interface Wind {
    speed: number;
    deg: number;
}