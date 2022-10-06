import User from "./User";

export default class Tuit {
   
   constructor(
      private _id: string,
      private _tuit: string,
      private _postedOn: Date,
      private _postedBy: User | null = null
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

   public get postedBy(): User | null {
      return this._postedBy;
   }

   public set postedBy(value: User | null) {
      this._postedBy = value;
   }

}
