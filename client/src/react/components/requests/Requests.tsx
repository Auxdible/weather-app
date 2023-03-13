import {
    useQuery
} from "react-query";
import axios from "axios";
import Error from "@backend/Error";
import React from "react";
import './Requests.scss'
export function Requests() {
    let query = useQuery('requests', () => axios.get("weather/api/requests").then((res) => {
        return res.data;
    }));
    let requestData: Error | {
        total_requests: number
    } = query.isError ? {
        error: "Error"
    } : query.isLoading ? {
        error: "Loading"
    } : query.data ? query.data : {
        error: "Idle"
    };
    return (
        <div className="requests-info">
            <p className="font1 request-info">Times used in the past week: {'error' in requestData ? requestData.error : requestData.total_requests}</p>
        </div>
    );
}