"use strict";
/**
 * @file implements LikeDao data access object
*/
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
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
const User_1 = __importDefault(require("../models/User"));
/**
* @class LikeDao implements Data access object for likes resource
*/
class LikeDao {
    constructor() {
        /**
        * Retrieves list of users that have liked a Tuit
        * @param {string} tid tuit id
        * @returns {Like[]} array of users
        */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            const users = yield LikeModel_1.default.find({ tuit: tid }).populate("likedBy").exec();
            const userObjects = users.map((user) => {
                var _a, _b, _c, _d;
                return new User_1.default({
                    _id: (_a = user === null || user === void 0 ? void 0 : user._id.toString()) !== null && _a !== void 0 ? _a : '',
                    _username: (_b = user === null || user === void 0 ? void 0 : user._username.toString()) !== null && _b !== void 0 ? _b : '',
                    _email: (_d = (_c = user === null || user === void 0 ? void 0 : user._email) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ''
                });
            });
            return userObjects;
        });
        /**
         * Find if a user liked a Tuit or not
         * @param uid user id
         * @param tid tuit id
         * @returns a Like object
         */
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likedBy: uid }); });
        /**
         * Count how many users liked a Tuit
         * @param tid tuit id
         * @returns number of likes
         */
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid }); });
        /**
        * Retrieves list of tuits that have been liked by a user
        * @param {string} uid user id
        * @returns {Like[]} array of tuits
        */
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            const likes = LikeModel_1.default
                .find({ likedBy: uid })
                .populate("tuit")
                .exec();
            return likes;
        });
        /**
        * User likes a Tuit
        * @param {string} uid user id
        * @param {string} tid tuit id
        * @returns {any} like relationship
        */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            const likeModel = yield LikeModel_1.default.create({ tuit: tid, likedBy: uid });
            return likeModel;
        });
        /**
        * User unlikes a Tuit
        * @param {string} uid user id
        * @param {string} tid tuit id
        * @returns {any} status
        */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid });
        });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
* Creates singleton dao instance
* @return LikeDao
*/
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
