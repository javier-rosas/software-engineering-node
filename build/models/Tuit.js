"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
   * @class Tuit encloses tuit data and functionality
   * @property {string} _id
   * @property {string} _tuit actual tuit data (image, text, etc.)
   * @property {Date} _postedOn date that Tuit was posted on
   * @property {string} _postedBy
**/
class Tuit {
    constructor(_id, _tuit, _postedOn, _postedBy = null) {
        this._id = _id;
        this._tuit = _tuit;
        this._postedOn = _postedOn;
        this._postedBy = _postedBy;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get tuit() {
        return this._tuit;
    }
    set tuit(value) {
        this._tuit = value;
    }
    get postedOn() {
        return this._postedOn;
    }
    set postedOn(value) {
        this._postedOn = value;
    }
    get postedBy() {
        return this._postedBy;
    }
    set postedBy(value) {
        this._postedBy = value;
    }
}
exports.default = Tuit;
