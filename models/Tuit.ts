/**
 * @file Declares Tuit class
 */
import User from "./User";


/**
   * @class Tuit encloses tuit data and functionality
   * @property {string} _id 
   * @property {string} _tuit actual tuit data (image, text, etc.)
   * @property {Date} _postedOn date that Tuit was posted on
   * @property {string} _postedBy
**/
export default class Tuit {
   
   constructor(
      private _id: string,
      private _tuit: string,
      private _postedOn: Date,
      private _postedBy: string | null = null
   ) {}

   public get id(): string {
      return this._id;
   }

   public set id(value: string) {
      this._id = value;
   }

   public get tuit(): string {
      return this._tuit;
   }

   public set tuit(value: string) {
      this._tuit = value;
   }

   public get postedOn(): Date {
      return this._postedOn;
   }

   public set postedOn(value: Date) {
      this._postedOn = value;
   }

   public get postedBy(): string | null {
      return this._postedBy;
   }

   public set postedBy(value: string | null) {
      this._postedBy = value;
   }

}
