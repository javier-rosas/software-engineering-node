"use strict";
/**
 * @file Declares Tuit2Topic class
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Tuit2Topic encloses user 2 topic data structure
 * @property {string} _id
 * @property {string} _username
   **/
class Tuit2Topic {
    constructor(_topic, _tuit) {
        this._topic = _topic;
        this._tuit = _tuit;
    }
    get topic() {
        return this._topic;
    }
    set topic(value) {
        this._topic = value;
    }
    get tuit() {
        return this._tuit;
    }
    set tuit(value) {
        this._tuit = value;
    }
}
exports.default = Tuit2Topic;
