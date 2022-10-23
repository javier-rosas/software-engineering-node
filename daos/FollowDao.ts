import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import User from "../models/User";

export default class FollowDao implements FollowDaoI {
  private static followDao: FollowDao | null = null;
  public static getInstance = (): FollowDao => {
      if(FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
      }
      return FollowDao.followDao;
  }
  private constructor() {}

  async followUser(uid1: string, uid2: string): Promise<Follow> {
    return await FollowModel.create({_follower: uid1, _followed: uid2})
  }

  async unFollowUser(uid1: string, uid2: string): Promise<any> {
    return await FollowModel.deleteOne({_follower: uid1, _followed: uid2})
  }

  async getFollowing(uid1: string): Promise<User[]> {
    const followingMongooseModel = await FollowModel.find({_follower: uid1}).populate('_followed').exec()
    const following = followingMongooseModel.map((user) => {
      user = user._followed
      return new User(user)
    })
    return following
  }

  async getFollowers(uid1: string): Promise<User[]> {
    const followedMongooseModel = await FollowModel.find({_followed: uid1}).populate('_follower').exec()
    const followed = followedMongooseModel.map((user) => {
      user = user._follower
      return new User(user)
    })
    return followed
  }

    

    // findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    //     LikeModel
    //         .find({tuit: tid})
    //         .populate("likedBy")
    //         .exec();
    
    // findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
    //   const likes =  LikeModel
    //         .find({likedBy: uid})
    //         .populate("tuit")
    //         .exec()
    //   return likes
    // }
        
    // userLikesTuit = async (uid: string, tid: string): Promise<any> => {
    //   const likeModel = LikeModel.create({tuit: tid, likedBy: uid})
    //   return likeModel
    // }
        
    // userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
    //   return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    // }

      
}