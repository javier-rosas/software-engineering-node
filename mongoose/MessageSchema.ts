import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new mongoose.Schema({
  _userID1: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _userID2: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _sentBy: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _sentTo: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _timestamp: {type: Date, default: Date.now},
  _message: String,
}, {collection: 'messages'})

export default MessageSchema