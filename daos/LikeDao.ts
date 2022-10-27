/**
 * @file implements LikeDao data access object
*/


import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
* @class LikeDao implements Data access object for likes resource
*/
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
    * Creates singleton dao instance
    * @return LikeDao
    */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
    * Retrieves list of users that have liked a Tuit
    * @param {string} tid tuit id
    * @returns {Like[]} array of users
    */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    
    /**
    * Retrieves list of tuits that have been liked by a user
    * @param {string} uid user id
    * @returns {Like[]} array of tuits
    */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
      const likes =  LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec()
      return likes
    }
        
    /**
    * User likes a Tuit
    * @param {string} uid user id
    * @param {string} tid tuit id
    * @returns {any} like relationship
    */
    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
      const likeModel = LikeModel.create({tuit: tid, likedBy: uid})
      return likeModel
    }
      
    /**
    * User unlikes a Tuit
    * @param {string} uid user id
    * @param {string} tid tuit id
    * @returns {any} status
    */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
      return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
      
}