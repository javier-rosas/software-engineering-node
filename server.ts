import express from 'express';
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDao";
import mongoose from "mongoose";
import cors from "cors"


mongoose.connect('mongodb://localhost:27017');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
const tuitDao = TuitDao.getInstance();
TuitController.getInstance(app, tuitDao);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
