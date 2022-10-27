"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
/**
 * @file Implements mongoose schema for the Follows collection
 */
const FollowSchema = new mongoose_1.default.Schema({
    _follower: { required: true, type: Schema.Types.ObjectId, ref: "UserModel" },
    _followed: { required: true, type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: 'follows' });
exports.default = FollowSchema;
