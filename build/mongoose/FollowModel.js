"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FollowSchema_1 = __importDefault(require("./FollowSchema"));
/**
* @file Implements mongoose model to CRUD
* documents in the Follows collection
*/
const FollowModel = mongoose_1.default.model("FollowModel", FollowSchema_1.default);
exports.default = FollowModel;
