import express from 'express';
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import mongoose from "mongoose";
import BookmarkController from './controllers/BookmarkController';
import BookmarkDao from './daos/BookmarkDao'
import MessageDao from './daos/MessageDao'
import MessageController from './controllers/MessageController';
import LikeController from './controllers/LikeController'
import LikeDao from './daos/LikeDao';
import FollowController from './controllers/FollowController';
import FollowDao from './daos/FollowDao'

const cors = require('cors')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}

mongoose.connect('mongodb://localhost:27017/alice', options);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

const userDao = UserDao.getInstance();
UserController.getInstance(app, userDao);

const tuitDao = TuitDao.getInstance();
TuitController.getInstance(app, tuitDao);

const bookmarkDao = BookmarkDao.getInstance();
BookmarkController.getInstance(app, bookmarkDao);

const messageDao = MessageDao.getInstance();
MessageController.getInstance(app, messageDao);

const likeDao = LikeDao.getInstance();
LikeController.getInstance(app, likeDao);

const followDao = FollowDao.getInstance();
FollowController.getInstance(app, followDao);


const PORT = 4000;
app.listen(process.env.PORT || PORT);
console.log("server listening in port", PORT)