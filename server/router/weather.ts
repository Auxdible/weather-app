import express from 'express';
import axios from 'axios';
import Request from '../models/Request';
import {
    geolocateLocationData,
    reverseGeolocateLatLong
} from "../util/geolocation";
import {
    CityState,
    Coordinates,
    CoordinatesInput,
    PostalCode
} from "../types/LocationType";

// weatherRouter = "/weather"
const weatherRouter = express.Router();

// Default coordinates for if there is an error with finding a location. Defaults to Heathrow, England.
let defaultCoords = <CoordinatesInput>{
    type: "coordinates",
    latitude: "51.464082476921725",
    longitude: "-0.44172685594193967",
};

// /api/current - Get the weather data, expecting either a latitude and longitude query string, a city and an optional state query string, or a postal code which is parsed as a number.
weatherRouter.get('/api/current', (req : express.Request, res : express.Response) => {
    // get the object to use based off of string query, or use defaultCoords if it cannot be found.
    let val = req.query['latitude'] && req.query['longitude'] ?
        !isNaN(Number(req.query['latitude'])) && !isNaN(Number(req.query['longitude'])) ?
            <CoordinatesInput>{ type: "coordinates",
                latitude: req.query['latitude'],
                longitude: req.query['longitude']
            } : defaultCoords :
        req.query['city'] ?
            <CityState>{ type: "city_state",
                city: req.query['city'],
                state: req.query['state'] ? req.query['state'] : ""
            } : req.query['postalcode'] ?
                <PostalCode>{ type: "postal_code",
                    postalCode: Number(req.query['postalcode'])
                } : defaultCoords;
    // geolocate location data. get if coordinates exist.
    geolocateLocationData(val).then((coordinates) => {
        if (coordinates) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.WEATHER_API_KEY}&units=imperial`)
                .then((weatherRes) => {
                    let data = weatherRes.data;
                    reverseGeolocateLatLong({ lat: coordinates.latitude, lon: coordinates.longitude }).then((cityData) => {
                        // object created from data using reverse geolocation and openweathermap weather data (Credit to: https://openweathermap.org/)
                        let object = {
                            loading: false,
                            data: {
                                city: data.name,
                                state: cityData && cityData[0].state != undefined ? cityData[0].state : undefined,
                                country: cityData && cityData[0].country ? cityData[0].country : "No Country",
                                temp: data.main.temp,
                                feels_like: data.main.feels_like,
                                humidity: data.main.humidity,
                                temp_max: data.main.temp_max,
                                temp_min: data.main.temp_min,
                                sunrise: data.sys.sunrise,
                                sunset: data.sys.sunset,
                                time: data.dt,
                                condition: {
                                    main: data.weather[0].main,
                                    description: data.weather[0].description,
                                    icon_id: data.weather[0].icon,
                                    id: data.weather[0].id
                                },
                                wind: {
                                    speed: data.wind.speed,
                                    deg: data.wind.deg
                                }
                            }
                        }
                        let newReq = new Request({
                            ip: req.ip
                        });
                        newReq.save();
                        res.json(object);
                    }).catch((error) => {
                        console.error(error);
                        // Error sent if there is an issue with reverse geolocation.
                        res.json({ error: "Could not get weather data. (Reverse geolocation error.)"})
                    });

                })
                .catch((error) => {
                    // Error sent if weather data cannot be found.
                    res.json({ error: "Could not get weather data." });
                })
        } else {

            // Error sent if coordinates do not exist.
            res.json({ error: "Could not find that location!" });
        }

    }).catch(() => {
        // Error sent if geolocation had an error.
        res.json({ error: "Error fetching geolocation data!" });
    });

})

// /api/requests - Get the total requests that have been sent. Optionally you can include a 'ip' query string to get requests under an ip, a 'useMyIp' query string to use the ip requesting, or a 'from' query string to get all requests from a specific unix timestamp.
weatherRouter.get('/api/requests', (req : express.Request, res: express.Response) => {
    let query = Request.find();
    // if the query contains 'ip' add a check for the ip in the string query.
    if (req.query['ip']) {
        query = query.find({
            ip: req.query['ip']
        });
    }
    // if the query contains 'useMyIp' add a check for the request ip.
    if (req.query['useMyIp']) {
        query = query.find({
            ip: req.ip
        })
    }
    // if the query contains 'from' check for if the unix_time number is greater than the (checked for valid date) 'from' unix timestamp.
    if (req.query['from']) {
        let from = new Date(Number(req.query['from']));
        if (!isNaN(from.getTime())) {
            query = query.find({
                unix_time: { $gt: from.valueOf() }
            });
        } else {
            res.json({ error: "Not a valid unix timestamp!" });
        }
    }
    // execute query
    query.exec().then((data) => {
        res.json({ total_requests: data ? data.length : 0 });
    })
})
export default weatherRouter;