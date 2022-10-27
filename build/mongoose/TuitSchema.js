"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const TuitSchema = new mongoose_1.default.Schema({
    _tuit: { type: String, required: true },
    _postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    _postedOn: { type: Date, default: Date.now }
}, { collection: 'tuits' });
exports.default = TuitSchema;
