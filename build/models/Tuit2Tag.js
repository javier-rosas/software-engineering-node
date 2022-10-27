"use strict";
/**
 * @file Declares Tuit2Tag class
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Tuit2Tag encloses user 2 tag data structure
 * @property {string} _id
 * @property {string} _username
   **/
class Tuit2Tag {
    constructor(_tag, _tuit) {
        this._tag = _tag;
        this._tuit = _tuit;
    }
    get tag() {
        return this._tag;
    }
    set tag(value) {
        this._tag = value;
    }
    get tuit() {
        return this._tuit;
    }
    set tuit(value) {
        this._tuit = value;
    }
}
exports.default = Tuit2Tag;
