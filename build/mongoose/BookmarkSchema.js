"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const BookmarkSchema = new mongoose_1.default.Schema({
    _bookmarkedTuitId: { required: true, type: Schema.Types.ObjectId, ref: "TuitModel" },
    _bookmarkedUserId: { required: true, type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: 'bookmarks' });
exports.default = BookmarkSchema;
