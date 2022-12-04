"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Authenitcation controller implements restful api service for the auth service
 * @param app
 */
const AuthenticationController = (app) => {
    const userDao = UserDao_1.default.getInstance();
    /**
     * If the user exists, return status 403, otherwise, create the
     * user witht the body of the post request data
     * @param req
     * @param res
     * @returns
     */
    const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser._password;
        const hash = yield bcrypt.hash(password, saltRounds);
        newUser._password = hash;
        const existingUser = yield userDao.findUserByUsername(req.body._username);
        if (!(Array.isArray(existingUser) && existingUser.length === 0)) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao.createUser(newUser);
            insertedUser.password = '';
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    /**
     * Get profile data from session
     * @param req
     * @param res
     */
    const profile = (req, res) => {
        const profile = req.session['profile'];
        if (profile) {
            profile._password = "";
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    /**
     * User logout.
     * @param req
     * @param res
     */
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    /**
     * User logs in. If the user exists, we will compare the hashes. If there
     * is a match, set the session profile to the user and send it back as json.
     * @param req
     * @param res
     * @returns
     */
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const username = user._username;
        const password = user._password;
        let existingUser = yield userDao
            .findUserByUsername(username);
        existingUser = existingUser[0];
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = yield bcrypt.compare(password, existingUser._password);
        const hashesMatch = password === existingUser._password;
        if (match || hashesMatch) {
            existingUser._password = '*****';
            req.session['profile'] = existingUser;
            res.json(existingUser);
        }
        else {
            res.sendStatus(403);
        }
    });
    // api routes
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/signup", signup);
};
exports.default = AuthenticationController;
