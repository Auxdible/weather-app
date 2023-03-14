import React from "react";
import {
    RiCloudFill,
    RiCloudLine,
    RiCloudyFill,
    RiCloudyLine,
    RiMoonClearFill,
    RiMoonCloudyFill,
    RiMoonFoggyFill,
    RiRainyFill,
    RiRainyLine,
    RiShowersFill,
    RiShowersLine,
    RiSnowyFill,
    RiSnowyLine,
    RiSunCloudyLine,
    RiSunFoggyFill,
    RiSunLine,
    RiThunderstormsFill,
    RiThunderstormsLine
} from "react-icons/ri";

// WeatherIcon corresponding to the id provided by openweathermap (Credit to: https://openweathermap.org/)
const WeatherIcon: { id: string, icon: React.ReactElement }[] = [
    { id: "01n", icon: (<RiMoonClearFill className="icon data-icon" />)  },
    { id: "01d", icon: (<RiSunLine className="icon data-icon" />) },
    { id: "02n", icon: (<RiMoonCloudyFill className="icon data-icon"/>) },
    { id: "02d", icon: (<RiSunCloudyLine className="icon data-icon"/>) },
    { id: "03n", icon: (<RiCloudyFill className="icon data-icon" />) },
    { id: "03d", icon: (<RiCloudyLine className="icon data-icon" />) },
    { id: "04n", icon: (<RiCloudFill className="icon data-icon" />) },
    { id: "04d", icon: (<RiCloudLine className="icon data-icon" />) },
    { id: "09n", icon: (<RiShowersFill className="icon data-icon" />) },
    { id: "09d", icon: (<RiShowersLine className="icon data-icon" />) },
    { id: "10n", icon: (<RiRainyFill className="icon data-icon" />) },
    { id: "10d", icon: (<RiRainyLine className="icon data-icon" />) },
    { id: "11n", icon: (<RiThunderstormsFill className="icon data-icon" />) },
    { id: "11d", icon: (<RiThunderstormsLine className="icon data-icon" />) },
    { id: "13n", icon: (<RiSnowyFill className="icon data-icon" />) },
    { id: "13d", icon: (<RiSnowyLine className="icon data-icon" />) },
    { id: "50n", icon: (<RiMoonFoggyFill className="icon data-icon" />) },
    { id: "50d", icon: (<RiSunFoggyFill className="icon data-icon" />) }
];
export default WeatherIcon;
