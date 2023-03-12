import NodeGeocoder, {
    Entry,
    Location
} from 'node-geocoder';
import {
    CityState,
    Coordinates,
    CoordinatesInput,
    PostalCode
} from "../types/LocationType";

// create geocoder using nominatim & openstreetmap (Credit: https://nominatim.org/ https://wiki.openstreetmap.org/wiki/About_OpenStreetMap)
const geocoder = NodeGeocoder({
    provider: 'openstreetmap',
    timeout: undefined,

})

// function for geolocating location data
export async function geolocateLocationData(location: CoordinatesInput | CityState | PostalCode): Promise < Coordinates | undefined > {
    let query = location.type == "coordinates" ? location : location.type == "city_state" ? ({
        city: location.city,
        ...(location.state ? {
            state: location.state
        } : {})
    }) : location.type == "postal_code" ? ({
        postalcode: location.postalCode
    }) : undefined;
    if (location.type == "coordinates") {
        return {
            latitude: Number(location.latitude),
            longitude: Number(location.longitude)
        };
    } else {
        let geocoded = await geocoder.geocode({
            ...query,
            limit: 1
        });
        console.log(geocoded[0]);
        return geocoded[0] ? <Coordinates>{
            latitude: geocoded[0].latitude,
            longitude: geocoded[0].longitude
        } : undefined;


    }
}

// reverse geolocate
export async function reverseGeolocateLatLong(coords: Location): Promise<Entry[] | undefined> {
    return geocoder.reverse(coords).then((data) => {
        return data;
    }).catch((err) => {
        console.error(err.response);
        return undefined;
    });

}