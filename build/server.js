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
const PORT = 4000;
app.listen(process.env.PORT || PORT);
console.log("server listening in port", PORT);
