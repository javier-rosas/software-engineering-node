"use strict";
/**
 * @file Declares Topic class
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Topic encloses Topic data and functionality
 * @property {string} _topic topic data
 */
class Topic {
    constructor(_topic) {
        this._topic = _topic;
    }
    get topic() {
        return this._topic;
    }
    set topic(value) {
        this._topic = value;
    }
}
exports.default = Topic;
