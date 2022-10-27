"use strict";
/**
 * @file implements Message data access object
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
const Message_1 = __importDefault(require("../models/Message"));
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
* @class MessageDao implements Data access object for message resource
*/
class MessageDao {
    constructor() { }
    /**
    * Send a message to another user
    * @param {Message} message message object
    * @returns {Message} message object
    */
    sendMessage(message) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const messageMongooseModel = yield MessageModel_1.default.create(message);
            return new Message_1.default({
                _id: (_a = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '',
                _sentBy: (_b = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._sentBy.toString()) !== null && _b !== void 0 ? _b : '',
                _sentTo: (_c = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._sentTo.toString()) !== null && _c !== void 0 ? _c : '',
                _timestamp: new Date((_d = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._timestamp) !== null && _d !== void 0 ? _d : (new Date())),
                _message: (_f = (_e = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._message) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : ''
            });
        });
    }
    /**
    * Get all messages sent by a user
    * @param {string} _sentBy user ID
    * @returns {Message} list of message objects sent by user
    */
    getSentMessages(_sentBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageMongooseModels = yield MessageModel_1.default.find({ _sentBy: _sentBy });
            const messages = messageMongooseModels.map((messageMongooseModel) => {
                var _a, _b, _c, _d, _e, _f;
                return new Message_1.default({
                    _id: (_a = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '',
                    _sentBy: (_b = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._sentBy.toString()) !== null && _b !== void 0 ? _b : '',
                    _sentTo: (_c = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._sentTo.toString()) !== null && _c !== void 0 ? _c : '',
                    _timestamp: new Date((_d = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._timestamp) !== null && _d !== void 0 ? _d : (new Date())),
                    _message: (_f = (_e = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._message) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : ''
                });
            });
            return messages;
        });
    }
    /**
    * Get all messages received by a user
    * @param {string} _sentTo user ID
    * @returns {Message} list of message objects received by user
    */
    getReceivedMessages(_sentTo) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageMongooseModels = yield MessageModel_1.default.find({ _sentTo: _sentTo });
            const messages = messageMongooseModels.map((messageMongooseModel) => {
                var _a, _b, _c, _d, _e, _f;
                return new Message_1.default({
                    _id: (_a = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '',
                    _sentBy: (_b = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._sentBy.toString()) !== null && _b !== void 0 ? _b : '',
                    _sentTo: (_c = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._sentTo.toString()) !== null && _c !== void 0 ? _c : '',
                    _timestamp: new Date((_d = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._timestamp) !== null && _d !== void 0 ? _d : (new Date())),
                    _message: (_f = (_e = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._message) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : ''
                });
            });
            return messages;
        });
    }
    /**
    * Delete message from the database
    * @param {string} _id message ID
    * @returns {any} status
    */
    deleteMessage(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.deleteOne({ _id: _id });
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
* Creates singleton dao instance
* @return MessageDao
*/
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
