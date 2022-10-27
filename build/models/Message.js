"use strict";
/**
 * @file Declares Message class
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Message encloses Message data and functionality
 * @property {string} _id
 * @property {string} _userID1 userID1 is the smallest ObjectID of the two
 * @property {string} _userID2 userID2 is the largest ObjectID of the two
 * @property {string} _sentBy
 * @property {string} _sentTo
 * @property {string} _timestamp
 * @property {string} _message actual message data
 */
class Message {
    constructor({ _id, _userID1, _userID2, _sentBy, _sentTo, _timestamp, _message }) {
        this._id = _id;
        this._userID1 = _userID1;
        this._userID2 = _userID2;
        this._sentBy = _sentBy;
        this._sentTo = _sentTo;
        this._timestamp = _timestamp;
        this._message = _message;
    }
    // id
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    // userID 1
    get userID1() {
        return this._userID1;
    }
    set userID1(value) {
        this._userID1 = value;
    }
    // userID 2
    get userID2() {
        return this._userID2;
    }
    set userID2(value) {
        this._userID2 = value;
    }
    // sentBy
    get sentBy() {
        return this._sentBy;
    }
    set sentBy(value) {
        this._sentBy = value;
    }
    // sentTo
    get sentTo() {
        return this._sentTo;
    }
    set sentTo(value) {
        this._sentTo = value;
    }
    // timestamp
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    // message
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
}
exports.default = Message;
