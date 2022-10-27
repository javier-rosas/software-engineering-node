"use strict";
/**
 * @file implements BookmarkDao data access object
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
const Bookmark_1 = __importDefault(require("../models/Bookmark"));
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
* @class BookmarkDao implements Data access object for bookmarks resource
*/
class BookmarkDao {
    constructor() { }
    /**
      * User bookmarks a Tuit
      * @param {string} uid user id
      * @param {string} tid tuit id
      * @returns {Bookmark} Bookmark relationship object
    */
    createBookmark(uid, tid) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const bookmarkMongooseModel = yield BookmarkModel_1.default.create({ _bookmarkedUserId: uid, _bookmarkedTuitId: tid });
            return new Bookmark_1.default({
                _id: (_a = bookmarkMongooseModel === null || bookmarkMongooseModel === void 0 ? void 0 : bookmarkMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '',
                _bookmarkedTuitId: (_b = bookmarkMongooseModel === null || bookmarkMongooseModel === void 0 ? void 0 : bookmarkMongooseModel._bookmarkedTuitId.toString()) !== null && _b !== void 0 ? _b : '',
                _bookmarkedUserId: (_c = bookmarkMongooseModel === null || bookmarkMongooseModel === void 0 ? void 0 : bookmarkMongooseModel._bookmarkedUserId.toString()) !== null && _c !== void 0 ? _c : ''
            });
        });
    }
    /**
      * User unbookmarks a Tuit
      * @param {string} uid user id
      * @param {string} tid tuit id
      * @returns {any} status
    */
    unBookmark(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.deleteOne({ _bookmarkedUserId: uid, _bookmarkedTuitId: tid });
        });
    }
    /**
      * Get all bookmarked tuits by a user
      * @param {string} uid user id
      * @returns {Tuit[]} list of Tuit objects
    */
    getAllBookmarkedTuitsbyUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModels = yield BookmarkModel_1.default.find({ _bookmarkedUserId: uid }).populate('_bookmarkedTuitId').exec();
            const tuitModels = tuitMongooseModels.map((tuit) => {
                return tuit._bookmarkedTuitId;
            });
            return tuitModels;
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
* Creates singleton dao instance
* @return BookmarkDao
*/
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
