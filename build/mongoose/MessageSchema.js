"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const MessageSchema = new mongoose_1.default.Schema({
    _userID1: { type: Schema.Types.ObjectId, ref: "UserModel" },
    _userID2: { type: Schema.Types.ObjectId, ref: "UserModel" },
    _sentBy: { required: true, type: Schema.Types.ObjectId, ref: "UserModel" },
    _sentTo: { required: true, type: Schema.Types.ObjectId, ref: "UserModel" },
    _timestamp: { type: Date, default: Date.now },
    _message: String,
}, { collection: 'messages' });
exports.default = MessageSchema;
