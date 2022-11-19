import express from 'express';
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import MessageController from "./controllers/MessageController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import MessageDao from "./daos/MessageDao";
import FollowDao from "./daos/FollowDao";
import LikeDao from "./daos/LikeDao";
import mongoose from "mongoose";
import LikeController from './controllers/LikeController';
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import BookmarkDao from "./daos/BookmarkDao";
import AuthenticationController from './controllers/authController';
//import cors from 'cors'
//import session from 'express-session'
//import dotenv from 'dotenv'
// import cors from 'cors'
const cors = require('cors')
const session = require("express-session")
const dotenv = require('dotenv')
dotenv.config()

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const mongoConnection = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ag4lgoo.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoConnection, options);
const app = express();
let sess = {
  secret: process.env.SECRET,
  cookie: {
      secure: false
  }
}

if (process.env.ENV === 'PRODUCTION') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}


const corsConfig = {
  origin: true,
  credentials: true
};

// app.use(cookieParser())
app.use(session(sess))
app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

const userDao = UserDao.getInstance();
UserController.getInstance(app, userDao);

const tuitDao = TuitDao.getInstance();
TuitController.getInstance(app, tuitDao);

const messageDao = MessageDao.getInstance();
MessageController.getInstance(app, messageDao);

const likeDao = LikeDao.getInstance();
LikeController.getInstance(app, likeDao);

const followDao = FollowDao.getInstance();
FollowController.getInstance(app, followDao);

const bookmarkDao = BookmarkDao.getInstance();
BookmarkController.getInstance(app, bookmarkDao);

const auth = AuthenticationController(app)


const PORT = 4000;
app.listen(process.env.PORT || PORT);
console.log("server listening in port", PORT)