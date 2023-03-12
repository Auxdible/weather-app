import WeatherData from "@backend/WeatherData";

export default interface ResponseData {
    loading: boolean;
    data: WeatherData;
}