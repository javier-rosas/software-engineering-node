"use strict";
/**
 * @file declares Location class
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Location declares Location data type and functionality
 * @property {number} _latitude
 * @property {number} _longitude
 */
class Location {
    constructor(_latitude, _longitude) {
        this._latitude = _latitude;
        this._longitude = _longitude;
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(value) {
        this._latitude = value;
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(value) {
        this._longitude = value;
    }
}
exports.default = Location;
;
