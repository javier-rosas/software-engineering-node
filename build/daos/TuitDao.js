"use strict";
/**
 * @file implements Tuit data access object
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
const Tuit_1 = __importDefault(require("../models/Tuit"));
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
* @class TuitDao Implements Data access object for tuit resource
*/
class TuitDao {
    constructor() { }
    /**
    * Retrieves a single Tuit by id
    * @param {string} id Tuit id
    * @returns single Tuit object
    */
    findTuitById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.findById({ _id }).populate('_postedBy').exec();
            return tuitMongooseModel;
        });
    }
    /**
    * Retrieves all Tuits in the database
    * @returns list of all Tuit objects
    */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModels = yield TuitModel_1.default.find().populate('_postedBy').exec();
            return tuitMongooseModels;
        });
    }
    /**
    * Retrieves all Tuits posted by a user
    * @param {string} authorId user id
    * @returns list of all Tuit objects
    */
    findTuitsByUser(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModels = yield TuitModel_1.default.find({ _postedBy: authorId }).populate('_postedBy').exec();
            return tuitMongooseModels;
        });
    }
    /**
    * Creates a new Tuit in the database
    * @param {Tuit} tuit Tuit object to insert in the database
    * @returns {Tuit} Tuit object inserted in the database
    */
    createTuit(tuit) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.create(tuit);
            return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._tuit) !== null && _b !== void 0 ? _b : '', new Date((_c = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._postedOn) !== null && _c !== void 0 ? _c : (new Date())), (_e = (_d = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._postedBy) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : '');
        });
    }
    /**
    * Deletes a new Tuit from the database
    * @param {string} tuitId Tuit id to delete
    * @returns {any} status of the request
    */
    deleteTuit(tuitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tuitId });
        });
    }
    deleteTuitsByUserId(_postedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _postedBy: _postedBy });
        });
    }
    /**
    * Updates a Tuit in the database
    * @param {string} tuitId Tuit id to update
    * @param {Tuit} tuit Tuit object
    * @returns {any} status of the request
    */
    updateTuit(tuitId, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.updateOne({ _id: tuitId }, tuit);
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
* Creates singleton dao instance
* @return TuitDao
*/
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
