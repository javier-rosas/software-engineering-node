/**
 * @file implements FollowDao data access object
*/

import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import User from "../models/User";

/**
* @class FollowDao implements Data access object for follows resource
*/
export default class FollowDao implements FollowDaoI {
  private static followDao: FollowDao | null = null;

  /**
  * Creates singleton dao instance
  * @return FollowDao
  */
  public static getInstance = (): FollowDao => {
      if(FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
      }
      return FollowDao.followDao;
  }
  private constructor() {}

  /**
    * User1 follows user2
    * @param {string} uid1 user id of follower
    * @param {string} uid2 user id of followed
    * @returns {Follow} follow relationship object
  */
  async followUser(uid1: string, uid2: string): Promise<Follow> {
    return await FollowModel.create({_follower: uid1, _followed: uid2})
  }

  /**
    * User1 unfollows user2
    * @param {string} uid1 user id of follower
    * @param {string} uid2 user id of followed
    * @returns {any} status 
  */
  async unFollowUser(uid1: string, uid2: string): Promise<any> {
    return await FollowModel.deleteOne({_follower: uid1, _followed: uid2})
  }

  /**
    * get list of users being followed by user with uid1 
    * @param {string} uid1 user id 
    * @returns {User[]} list of user objects followed uid1  
  */
  async getFollowing(uid1: string): Promise<User[]> {
    const followingMongooseModel = await FollowModel.find({_follower: uid1}).populate('_followed').exec()
    const following = followingMongooseModel.map((user) => {
      user = user._followed
      return new User(user)
    })
    return following
  }

  /**
    * get list of users who are following user with uid1 
    * @param {string} uid1 user id 
    * @returns {User[]} list of user objects following uid1  
  */
  async getFollowers(uid1: string): Promise<User[]> {
    const followedMongooseModel = await FollowModel.find({_followed: uid1}).populate('_follower').exec()
    const followed = followedMongooseModel.map((user) => {
      user = user._follower
      return new User(user)
    })
    return followed
  }
      
}