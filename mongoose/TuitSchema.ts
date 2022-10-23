import mongoose from "mongoose";
const { Schema } = mongoose;

const TuitSchema = new mongoose.Schema({
  _tuit: {type: String, required: true},
  _postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  _postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'})

export default TuitSchema