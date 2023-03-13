import mongoose from "mongoose";

// Request interface containing the date of creation, the unix_time of creation, and ip taken from api request.
interface RequestInterface {
    date: Date;
    unix_time: number;
    ip: string;

}

// Schema implementation of RequestInterface
const RequestSchema = new mongoose.Schema<RequestInterface>({
    date: { type: Date, expires: 604800, default: Date.now() },
    unix_time: { type: Number, default: Date.now() },
    ip: String,
});

// Model of RequestInterface/RequestSchema
const Request = mongoose.model("Request", RequestSchema);

export default Request;