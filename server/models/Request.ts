import mongoose from "mongoose";
import requestSchema from "../schemas/Request";

// Model of RequestInterface/requestSchema (look at ../schemas/Request)
const Request = mongoose.model("Request", requestSchema);

export default Request;