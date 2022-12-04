/**
 * @file implements Dislike data access object
*/
import DislikeModel from "../mongoose/DislikeModel";

/**
* @class DislikeDao implements Data access object for dislikes resource
*/
export default class DislikeDao {

    private static dislikeDao: DislikeDao | null = null;

    /**
    * Creates singleton dao instance
    * @return DislikeDao
    */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
          DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
    * Retrieves list of users that have liked a Tuit
    * @param {string} tid tuit id
    * @returns {Like[]} array of users
    */
    // findAllUsersThatLikedTuit = async (tid: string): Promise<User[]> => {
    //   const users = await LikeModel.find({ tuit: tid }).populate("likedBy").exec()
    //   const userObjects = users.map((user: any) => {
    //     return new User({
    //       _id: user?._id.toString() ?? '',
    //       _username: user?._username.toString() ?? '',
    //       _email: user?._email?.toString() ?? ''
    //     })
    //   })
    //   return userObjects
    // }

    /**
     * Find if a user disliked a Tuit or not 
     * @param uid user id 
     * @param tid tuit id 
     * @returns a Dislike model  
     */
     findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid})
        
    /**
     * Count how many users disliked a Tuit
     * @param tid tuit id 
     * @returns number of dislikes 
     */
     countHowManyDislikedTuit = async (tid: string) =>
        DislikeModel.count({tuit: tid});
    
    /**
    * Retrieves list of tuits that have been liked by a user
    * @param {string} uid user id
    * @returns {Like[]} array of tuits
    */
    // findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
    //   const likes =  LikeModel
    //         .find({likedBy: uid})
    //         .populate("tuit")
    //         .exec()
    //   return likes
    // }
        
    /**
    * User dislikes a Tuit
    * @param {string} uid user id
    * @param {string} tid tuit id
    * @returns {any} dislike model
    */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> => {
      const likeModel = await DislikeModel.create({tuit: tid, dislikedBy: uid})
      return likeModel
    }
      
    /**
    * User undislikes a Tuit
    * @param {string} uid user id
    * @param {string} tid tuit id
    * @returns {any} status
    */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> => {
      return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }
      
}