import Like from "../models/Like";
import User from "../models/User"
/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    findAllUsersThatLikedTuit (tid: string): Promise<User[]>;
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
    userLikesTuit (tid: string, uid: string): Promise<Like>;
};