import mongoose from "mongoose";
const { Schema } = mongoose;

const TuitSchema = new mongoose.Schema({
  _tuit: {type: String, required: true},
  _postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  _postedOn: {type: Date, default: Date.now},
  _stats: {
    _replies: {type: Number, default: 0},
    _retuits: {type: Number, default: 0},
    _likes: {type: Number, default: 0},
    _dislikes: {type: Number, default: 0}
  }
}, {collection: 'tuits'})

export default TuitSchema