import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new mongoose.Schema({
  _userID1: {type: Schema.Types.ObjectId, ref: "UserModel"},
  _userID2: {type: Schema.Types.ObjectId, ref: "UserModel"},
  _sentBy: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _sentTo: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
  _timestamp: {type: Date, default: Date.now},
  _message: {type: String},
}, {collection: 'messages'})

export default MessageSchema