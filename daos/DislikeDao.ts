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

    /**
     * Retrieves list of tuits that have been disliked by a user
     * @param {string} uid user id
     * @returns {any} array of tuits
     */
      findAllTuitsDislikedByUser = async (uid: string): Promise<any> => {
      const likes =  DislikeModel
            .find({dislikedBy: uid})
            .populate("tuit")
            .exec()
      return likes
    }
      
}