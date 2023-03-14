import express from "express";
import path from "path";

const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

export default indexRouter;