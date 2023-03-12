import React from "react";
import ResponseData from "../../types/ResponseData";
import Error from "@backend/Error";
import InputType from "../../types/InputType";
import {CityState, CoordinatesInput, PostalCode} from "@backend/LocationType";
export interface InputInterface {
    location: CoordinatesInput | CityState | PostalCode;
}

export interface AppContextInterface {
    input: InputInterface | undefined;
    setInput: React.Dispatch<React.SetStateAction<InputInterface>>;
    getDefaultInput: Function;
    inputType: InputType;
    setInputType: React.Dispatch<React.SetStateAction<InputType>>;
    data: ResponseData | Error | undefined;
    setData: React.Dispatch<React.SetStateAction<ResponseData | Error | undefined>>;

}

const AppContext = React.createContext({} as AppContextInterface);

export default AppContext;