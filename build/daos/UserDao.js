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
/**
 * @file implements User data access object
 */
const User_1 = __importDefault(require("../models/User"));
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class UserDao Implements Data access object for user resource
 */
class UserDao {
    constructor() { }
    /**
    * Retrieves all users that liked a tuit from the database
    * @returns list of user objects
    */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.find();
            const users = userMongooseModel.map((user) => {
                var _a, _b, _c, _d, _e, _f;
                return new User_1.default({
                    _id: (_a = user === null || user === void 0 ? void 0 : user._id.toString()) !== null && _a !== void 0 ? _a : '',
                    _username: (_b = user === null || user === void 0 ? void 0 : user._username.toString()) !== null && _b !== void 0 ? _b : '',
                    _email: (_d = (_c = user === null || user === void 0 ? void 0 : user._email) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                    _password: (_f = (_e = user === null || user === void 0 ? void 0 : user._password) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : ''
                });
            });
            return users;
        });
    }
    /**
    * Retrieves user by id
    * @param {string} uid user id
    * @returns single user object
    */
    findUserById(uid) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.findById(uid);
            return new User_1.default({
                _id: (_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '',
                _username: (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._username.toString()) !== null && _b !== void 0 ? _b : '',
                _email: (_d = (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._email) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                _password: (_f = (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._password) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : ''
            });
        });
    }
    /**
    * Creates a new user
    * @param {User} user user object
    * @returns single user object
    */
    createUser(user) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.create(user);
            return new User_1.default({
                _id: (_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '',
                _username: (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._username.toString()) !== null && _b !== void 0 ? _b : '',
                _email: (_d = (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._email) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                _password: (_f = (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._password) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : '',
            });
        });
    }
    /**
    * Updates an existing user
    * @param {string} uid user id to update
    * @param {User} user user object
    * @returns status
    */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, user);
        });
    }
    /**
    * Deletes an existing user
    * @param {string} uid user id to delete
    * @returns status
    */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    deleteUserbyUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _username: username });
        });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
/**
* Creates singleton dao instance
* @return UserDao
*/
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
