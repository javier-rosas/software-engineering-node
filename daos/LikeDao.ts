import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
      const likes =  LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec()
      return likes
    }
        
    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
      const likeModel = LikeModel.create({tuit: tid, likedBy: uid})
      return likeModel
    }
        
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
      return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
      
}