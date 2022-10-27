/**
 * @file Declares Follow data type representing relationships between
 * users, as in user1 follows user2
 */

 /**
  * @typedef Follow Represents follow relationship between a users,
  * as in a user1 follows user2
  * @property {string} _follower User being followed
  * @property {string} _followed User following
  */
 
 export default class Follow {
   
    private _follower: string
    
    private _followed: string

    constructor(_follower: string, _followed: string) {
      this._follower = _follower
      this._followed = _followed
    }


    public get follower(): string {
      return this._follower
   }

   public set follower(value: string) {
      this._follower = value
   }

   public get followed(): string {
      return this._followed
   }
   public set followed(value: string) {
      this._followed = value
   }
 };