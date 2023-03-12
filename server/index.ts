import express from 'express';
import dotenv from 'dotenv';
import weatherRouter from "./router/weather";
import path from "path";
import mongoose from "mongoose";

// dotenv
dotenv.config();

// create the express app & get port from dotenv, defaulting to 5000
const app: express.Express = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({ extended: false }));

app.use('/weather', weatherRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// start listening on port
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

// attempt to connect to mongodb
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log("Failed to connect to MongoDB.");
        console.error(err);
    });
} else {
    console.log("Mongo URI not provided, not connecting to MongoDB");
}

export default app;

