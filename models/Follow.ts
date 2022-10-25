/**
 * @file Declares Follow data type representing relationships between
 * users, as in user1 follows user2
 */
import User from "./User";


 /**
  * @typedef Follow Represents follow relationship between a users,
  * as in a user1 follows user2
  * @property {User} _follower User being followed
  * @property {User} _followed User following
  */
 
 export default interface Follow {
    _follower: User,
    _followed: User
 };