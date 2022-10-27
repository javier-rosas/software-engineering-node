"use strict";
/**
 * @file Declares Tag class
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Tag encloses Tag data and functionality
 * @property {string} _tag tag data
 */
class Tag {
    constructor(_tag) {
        this._tag = _tag;
    }
    get tag() {
        return this._tag;
    }
    set tag(value) {
        this._tag = value;
    }
}
exports.default = Tag;
