/**
 * @file Implements mongoose schema for the Follows collection
 */

import mongoose from "mongoose";
const { Schema } = mongoose;

const FollowSchema = new mongoose.Schema({
  _follower: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _followed: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'follows'});

export default FollowSchema;