import {
    useContext
} from "react";
import AppContext from "../../context/AppContext";
import Error from '@backend/Error';
import ResponseData from "../../../types/ResponseData";
import {
    BiErrorCircle,
    BiLoaderCircle
} from 'react-icons/bi';
import './Data.scss'
import WeatherIcon from "../../../util/WeatherIcon";
export function WeatherData() {
    const {
        data
    } = useContext(AppContext) as {
        data: ResponseData
    };
    const DataIcon = data.data && !data.loading ? WeatherIcon.filter((i) => i.id == data.data.condition.icon_id)[0].icon : undefined;

    return !data.loading ? (
        <div className="main weather-data">
            <div className="status">
                { DataIcon ? DataIcon : ""}
                <h1 className={"no-margin font1 status-header data-header"}>{Math.round(data.data.temp)}°F</h1>
                <p className="no-margin font2 status-subheader data-subheader">{data.data.condition.main}</p>
                <p className="font2 status-description data-description">
                    {data.data.city}, {data.data.state ? data.data.state : data.data.country}<br/>
                    Feels like {Math.round(data.data.feels_like)}°F<br/>
                    Humidity: {data.data.humidity}%<br/>
                    Wind: {data.data.wind.speed} mph, {data.data.wind.deg}°<br/>
                </p>
            </div>
        </div>
    ) : (<div className="main loading-data">
        <BiLoaderCircle className="icon loading-icon" fontSize="100px"/>
        <div className="status">
            <h1 className="no-margin font1 status-header loading-header">Loading the current weather...</h1>
            <p className="font2 status-description loading-description">Please wait...</p>
        </div>
    </div>);
}
export function ErrorData() {
    const {
        data
    } = useContext(AppContext) as {
        data: Error
    };
    return (<div className="main error">
        <BiErrorCircle className="icon error-icon" />
        <div className="status">
            <h1 className="no-margin font1 status-header error-header">Sorry! We encountered an error.</h1>
            <p className="font2 status-description error-description">Error: { data.error }</p>
        </div>
    </div>)
}
export default function Welcome() {
    return (
        <div className="main welcome">
            <div className="status">
                <img src="./logo192.png" className="icon welcome-icon" alt="weather icon" />
                <h1 className="no-margin font1 status-header welcome-header">Welcome to Auxdible's Weather App!</h1>
                <p className="font2 status-description welcome-description">Enter your ZIP code, Latitude & Longitude, or City here.</p>
            </div>
        </div>
    );
}