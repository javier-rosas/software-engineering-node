"use strict";
/**
 * @file Declares User class
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
/**
 * @class User encloses user data and functionality
 * @property {string} _id unique user id
 * @property {string} _username
   * @property {string} _password
   * @property {string} _firstName
   * @property {string} _lastName
   * @property {string} _email
   * @property {string} _profilePhoto
   * @property {string} _headerImage
   * @property {AccountType} _accountType
   * @property {MaritalStatus} _maritalStatus
   * @property {string} _dateOfBirth
   * @property {Date} _joined
   * @property {Location} _location
   **/
class User {
    constructor({ _id, _username, _email, _password, _firstName, _lastName, _profilePhoto, _headerImage, _accountType, _maritalStatus, _biography, _dateOfBirth, _joined, _location }) {
        this._accountType = AccountType_1.default.Personal;
        this._maritalStatus = MaritalStatus_1.default.Single;
        this._joined = new Date();
        this._id = _id;
        this._username = _username;
        this._email = _email;
        this._password = _password;
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._profilePhoto = _profilePhoto;
        this._headerImage = _headerImage;
        this._accountType = _accountType;
        this._maritalStatus = _maritalStatus;
        this._biography = _biography;
        this._dateOfBirth = _dateOfBirth;
        this._joined = _joined;
        this._location = _location;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get profilePhoto() {
        return this._profilePhoto;
    }
    get headerImage() {
        return this._headerImage;
    }
    get accountType() {
        return this._accountType;
    }
    get maritalStatus() {
        return this._maritalStatus;
    }
    get biography() {
        return this._biography;
    }
    get dateOfBirth() {
        return this._dateOfBirth;
    }
    get joined() {
        return this._joined;
    }
    get location() {
        return this._location;
    }
    set firstName(value) {
        this._firstName = value;
    }
    set lastName(value) {
        this._lastName = value;
    }
    set profilePhoto(value) {
        this._profilePhoto = value;
    }
    set headerImage(value) {
        this._headerImage = value;
    }
    set accountType(value) {
        this._accountType = value;
    }
    set maritalStatus(value) {
        this._maritalStatus = value;
    }
    set biography(value) {
        this._biography = value;
    }
    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }
    set joined(value) {
        this._joined = value;
    }
    set location(value) {
        this._location = value;
    }
}
exports.default = User;
