"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Bookmark
 * @property {string} _id unique id
 * @property {string} _bookmarkedTuitId Tuit id
 * @property {string} _bookmarkedUserId id of user bookmarking the Tuit
 */
class Bookmark {
    constructor({ _id, _bookmarkedTuitId, _bookmarkedUserId }) {
        this._id = _id;
        this._bookmarkedTuitId = _bookmarkedTuitId;
        this._bookmarkedUserId = _bookmarkedUserId;
    }
    // id
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    // bookmarkedTuitId
    get bookmarkedTuitId() {
        return this._bookmarkedTuitId;
    }
    set bookmarkedTuitId(value) {
        this._bookmarkedTuitId = value;
    }
    // bookmarkedUserId
    get bookmarkedUserId() {
        return this._bookmarkedUserId;
    }
    set bookmarkedUserId(value) {
        this._bookmarkedUserId = value;
    }
}
exports.default = Bookmark;
