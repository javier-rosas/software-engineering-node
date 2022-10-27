"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const BookmarkDao_1 = __importDefault(require("./daos/BookmarkDao"));
const MessageDao_1 = __importDefault(require("./daos/MessageDao"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const LikeDao_1 = __importDefault(require("./daos/LikeDao"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const FollowDao_1 = __importDefault(require("./daos/FollowDao"));
const cors = require('cors');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
mongoose_1.default.connect('mongodb://localhost:27017/alice', options);
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const userDao = UserDao_1.default.getInstance();
UserController_1.default.getInstance(app, userDao);
const tuitDao = TuitDao_1.default.getInstance();
TuitController_1.default.getInstance(app, tuitDao);
const bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController_1.default.getInstance(app, bookmarkDao);
const messageDao = MessageDao_1.default.getInstance();
MessageController_1.default.getInstance(app, messageDao);
const likeDao = LikeDao_1.default.getInstance();
LikeController_1.default.getInstance(app, likeDao);
const followDao = FollowDao_1.default.getInstance();
FollowController_1.default.getInstance(app, followDao);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
console.log("server listening in port", PORT);
