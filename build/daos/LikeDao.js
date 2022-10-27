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
            return LikeModel_1.default
                .find({ tuit: tid })
                .populate("likedBy")
                .exec();
        });
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
            const likeModel = LikeModel_1.default.create({ tuit: tid, likedBy: uid });
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
