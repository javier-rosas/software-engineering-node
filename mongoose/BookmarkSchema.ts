import mongoose from "mongoose";
const { Schema } = mongoose;

const BookmarkSchema = new mongoose.Schema({
  _bookmarkedTuitId: {required: true, type: Schema.Types.ObjectId, ref: "TuitModel"},
  _bookmarkedUserId: {required: true, type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'bookmarks'});

export default BookmarkSchema;