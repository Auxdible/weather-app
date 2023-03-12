import React, {
    useContext
} from "react";
import AppContext, {
} from "../../context/AppContext";
import {CoordinatesInput, CityState, PostalCode} from "@backend/LocationType";
import axios from "axios";
import ResponseData from "../../../types/ResponseData";
import Error from "@backend/Error";
import './Form.scss'
import {useQueryClient} from "react-query";


function Form() {
    const queryClient = useQueryClient();
    const {
        input,
        setInput,
        getDefaultInput,
        setData,
        inputType,
        setInputType
    } = useContext(AppContext);
    function sendData(location: CoordinatesInput | CityState | PostalCode) {
        axios.get(`/weather/api/requests?useMyIp=true&from=${Date.now().valueOf() - 60000}`).then((data) => {

            if ('total_requests' in data.data && (data.data['total_requests'] as number) < 5) {
                axios.get(`/weather/api/current?${location.type == "coordinates" ? `latitude=${location.latitude}&longitude=${location.longitude}` :
                    location.type == "postal_code" ? `postalcode=${location.postalCode}` :
                        location.type == "city_state" ? `city=${location.city}&state=${location.state}` : ""}`)
                    .then((res) => {
                        setData(res.data as ResponseData | Error);
                        queryClient.invalidateQueries('requests');
                    }).catch((err) => {
                    setData({
                        error: "Could not find data."
                    })
                });
                setData({
                    loading: true
                } as ResponseData);

            } else {
                setData({
                    error: "Calm down there! You're sending too many requests (Maximum: 5 every 60 seconds.)"
                });
            }
        })


    }

    function changeInput() {
        setInputType(inputType + 1 >= 3 ? 0 : inputType + 1);
        getDefaultInput()
    }

    function useMyLocation(e: React.FormEvent < HTMLButtonElement > ) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                    sendData({
                        type: "coordinates",
                        latitude: data.coords.latitude + "",
                        longitude: data.coords.longitude + ""
                    })
                },
                (err) => {
                    setData({
                        error: "Error getting geolocation data!"
                    })
                })
        } else {
            setData({
                error: "You do not have geolocation enabled!"
            });
        }
        setData({
            loading: true
        } as ResponseData);
    }

    function handleChange(e: React.FormEvent < HTMLInputElement > ) {
        if (e.currentTarget.name === "latitude" || e.currentTarget.name === "longitude") {
            setInput({
                location: {
                    type: "coordinates",
                    latitude: e.currentTarget.name === "latitude" ? e.currentTarget.value : input && "latitude" in input.location ? input.location.latitude : "0",
                    longitude: e.currentTarget.name === "longitude" ? e.currentTarget.value : input && "longitude" in input.location ? input.location.longitude : "0",
                }
            })
        } else if (e.currentTarget.name === "city" || e.currentTarget.name === "state") {
            setInput({
                location: {
                    type: "city_state",
                    city: e.currentTarget.name === "city" ? e.currentTarget.value : input && "city" in input.location ? input.location.city : "0",
                    state: e.currentTarget.name === "state" ? e.currentTarget.value : input && "state" in input.location ? input.location.state : "0",
                }
            })
        } else if (e.currentTarget.name === "postal-code") {
            setInput({
                location: {
                    type: "postal_code",
                    postalCode: Number(e.currentTarget.value)
                }
            })
        }
    }

    function handleSubmit(e: React.FormEvent < HTMLButtonElement > ) {
        sendData(input ? input.location : {
            type: "coordinates",
            longitude: "0",
            latitude: "0"
        } );
        getDefaultInput();
    }

    return (
        <div className="form">
            <h1 className="font1 form-header">Location Info</h1>
            <div className="form-settings">
                <button className="font2 form-button change-input" onClick={changeInput}>{inputType === 0 ? "Lat & Lon" : inputType === 1 ? "City" : "ZIP"}</button>
                <button className="font2 form-button use-my-location" onClick={useMyLocation}>Use My Location</button>
            </div>


            {inputType === 0 ? <div className="input lat-long">
                <input type="number" name="latitude" className="font2 form-input" onChange={handleChange} value={input && "latitude" in input.location ? input.location.latitude : ""} placeholder="Latitude"></input>
                <input type="number" name="longitude" className="font2 form-input" onChange={handleChange} value={input && "longitude" in input.location ? input.location.longitude : ""} placeholder="Longitude"></input>
            </div> : inputType === 1 ? <div className="input city-state">
                <input type="text" name="city" className="font2 form-input" onChange={handleChange} value={input && "city" in input.location ? input.location.city : ""} placeholder="City (ex. Toronto, Miami)"></input>
                <input type="text" name="state" className="font2 form-input" onChange={handleChange} value={input && "state" in input.location ? input.location.state : ""} placeholder={'State* (ex. Ontario, Florida)'}></input>
            </div> : <div className="input postal">
                <input type="number" name="postal-code" className="font2 form-input" onChange={handleChange} value={input && "postalCode" in input.location ? input.location.postalCode : ""} placeholder="Postal/ZIP Code"></input>
            </div>}

            <button className="font2 form-button submit" onClick={handleSubmit}>Submit</button>

        </div>
    );
}

export default Form;