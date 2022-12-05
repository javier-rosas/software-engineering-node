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
 * @file implements Dislike data access object
*/
const DislikeModel_1 = __importDefault(require("../mongoose/DislikeModel"));
/**
* @class DislikeDao implements Data access object for dislikes resource
*/
class DislikeDao {
    constructor() {
        /**
         * Find if a user disliked a Tuit or not
         * @param uid user id
         * @param tid tuit id
         * @returns a Dislike model
         */
        this.findUserDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.findOne({ tuit: tid, dislikedBy: uid }); });
        /**
         * Count how many users disliked a Tuit
         * @param tid tuit id
         * @returns number of dislikes
         */
        this.countHowManyDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.count({ tuit: tid }); });
        /**
        * User dislikes a Tuit
        * @param {string} uid user id
        * @param {string} tid tuit id
        * @returns {any} dislike model
        */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            const likeModel = yield DislikeModel_1.default.create({ tuit: tid, dislikedBy: uid });
            return likeModel;
        });
        /**
        * User undislikes a Tuit
        * @param {string} uid user id
        * @param {string} tid tuit id
        * @returns {any} status
        */
        this.userUnDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.deleteOne({ tuit: tid, dislikedBy: uid });
        });
        /**
         * Retrieves list of tuits that have been disliked by a user
         * @param {string} uid user id
         * @returns {any} array of tuits
         */
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            const likes = DislikeModel_1.default
                .find({ dislikedBy: uid })
                .populate("tuit")
                .exec();
            return likes;
        });
    }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
/**
* Creates singleton dao instance
* @return DislikeDao
*/
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao === null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
