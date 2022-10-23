import User from "../models/User";
import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    followUser(uid1: string, uid2: string): Promise<Follow>
    unFollowUser(uid1: string, uid2: string): Promise<any>
    getFollowing(uid1: string): Promise<User[]>
    getFollowers(uid1: string): Promise<User[]>
}