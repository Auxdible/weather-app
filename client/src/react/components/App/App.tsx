import React, {
    useState
} from 'react';
import ResponseData from "../../../types/ResponseData";
import Form from "../form/Form";
import {
    InputInterface
} from "../../context/AppContext";
import AppContext from '../../context/AppContext';
import Error from '@backend/Error';
import Welcome, {
    ErrorData,
    WeatherData
} from "../data/Data";
import InputType from "../../../types/InputType";
import './App.scss';
import {
    DEFAULT_CITY_STATE,
    DEFAULT_COORDINATES,
    DEFAULT_POSTAL_CODE
} from "../../../util/Constants";
import {
    Requests
} from "../requests/Requests";

// App Component
function App() {
    let [data, setData] = useState(undefined as ResponseData | Error | undefined);
    let [inputType, setInputType] = useState(InputType.CITY_STATE);

    function getDefaultInput() {
        return inputType === 0 ? {
            location: DEFAULT_COORDINATES
        } : inputType === 1 ? {
            location: DEFAULT_CITY_STATE
        } : {
            location: DEFAULT_POSTAL_CODE
        }
    }
    let [input, setInput] = useState(getDefaultInput() as InputInterface);

    let value = {
        input,
        setInput,
        getDefaultInput,
        inputType,
        setInputType,
        data,
        setData
    }
    return (
        <AppContext.Provider value={value}>
            <div className="app">
                <div className="page">
                    {data ? "error" in data ? <ErrorData/> : <WeatherData/> : <Welcome/> }
                    <Form />
                    <div className="info">
                        <img src="./auxdible.svg" alt="Auxdible's icon." className="info-icon" />
                        <h1 className="font1 info-header">This is a fullstack portfolio project developed by Auxdible.</h1>
                        <p className="font2 info-licenses info-text">Data Licenses</p>
                        <p className="font2 info-licenses info-text">Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright</p>
                        <p className="font2 info-licenses info-text">Weather data provided by <a href="https://openweathermap.org/">OpenWeatherMap</a></p>
                        <h1 className="font1 info-header">Visit my website at <a href="https://auxdible.me">auxdible.me</a></h1>
                        <h1 className="font2 info-header">Check out the <a href="https://github.com/Auxdible/weather-app">source code</a>!</h1>
                    </div>
                    <Requests />
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;