import mongoose from "mongoose";

// Request interface containing the date of creation, the unix_time of creation, and ip taken from api request.
interface RequestInterface {
    date: Date;
    unix_time: number;
    ip: string;

}

// Schema implementation of RequestInterface
const requestSchema = new mongoose.Schema<RequestInterface>({
    date: { type: Date, expires: 604800, default: Date.now() },
    unix_time: { type: Number, default: Date.now() },
    ip: String,
});

export default requestSchema;