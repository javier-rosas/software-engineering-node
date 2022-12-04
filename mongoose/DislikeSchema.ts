
import mongoose, {Schema} from "mongoose";

/**
 * Dislike schema 
 */
const DislikeSchema = new mongoose.Schema<any>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});

export default DislikeSchema;