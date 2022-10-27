"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const MessageDao_1 = __importDefault(require("./daos/MessageDao"));
const FollowDao_1 = __importDefault(require("./daos/FollowDao"));
const LikeDao_1 = __importDefault(require("./daos/LikeDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const BookmarkDao_1 = __importDefault(require("./daos/BookmarkDao"));
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const mongoConnection = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ag4lgoo.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.connect(mongoConnection, options);
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const userDao = UserDao_1.default.getInstance();
UserController_1.default.getInstance(app, userDao);
const tuitDao = TuitDao_1.default.getInstance();
TuitController_1.default.getInstance(app, tuitDao);
const messageDao = MessageDao_1.default.getInstance();
MessageController_1.default.getInstance(app, messageDao);
const likeDao = LikeDao_1.default.getInstance();
LikeController_1.default.getInstance(app, likeDao);
const followDao = FollowDao_1.default.getInstance();
FollowController_1.default.getInstance(app, followDao);
const bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController_1.default.getInstance(app, bookmarkDao);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
console.log("server listening in port", PORT);
