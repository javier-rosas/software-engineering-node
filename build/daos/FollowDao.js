"use strict";
/**
 * @file implements FollowDao data access object
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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
* @class FollowDao implements Data access object for follows resource
*/
class FollowDao {
    constructor() { }
    /**
      * User1 follows user2
      * @param {string} uid1 user id of follower
      * @param {string} uid2 user id of followed
      * @returns {Follow} follow relationship object
    */
    followUser(uid1, uid2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.create({ _follower: uid1, _followed: uid2 });
        });
    }
    /**
      * User1 unfollows user2
      * @param {string} uid1 user id of follower
      * @param {string} uid2 user id of followed
      * @returns {any} status
    */
    unFollowUser(uid1, uid2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.deleteOne({ _follower: uid1, _followed: uid2 });
        });
    }
    /**
      * get list of users being followed by user with uid1
      * @param {string} uid1 user id
      * @returns {User[]} list of user objects followed uid1
    */
    getFollowing(uid1) {
        return __awaiter(this, void 0, void 0, function* () {
            const followingMongooseModel = yield FollowModel_1.default.find({ _follower: uid1 }).populate('_followed').exec();
            const following = followingMongooseModel.map((user) => {
                return user._followed;
            });
            return following;
        });
    }
    /**
      * get list of users who are following user with uid1
      * @param {string} uid1 user id
      * @returns {User[]} list of user objects following uid1
    */
    getFollowers(uid1) {
        return __awaiter(this, void 0, void 0, function* () {
            const followedMongooseModel = yield FollowModel_1.default.find({ _followed: uid1 }).populate('_follower').exec();
            const followed = followedMongooseModel.map((user) => {
                return user._follower;
            });
            return followed;
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
* Creates singleton dao instance
* @return FollowDao
*/
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
