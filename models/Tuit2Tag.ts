/**
 * @file Declares Tuit2Tag class
 */

import Tuit from './Tuit'


 /**
  * @class Tuit2Tag encloses user 2 tag data structure
  * @property {string} _id 
  * @property {string} _username 
	**/
export default class Tuit2Tag {
  
  constructor(
    private _tag: string,
    private _tuit: Tuit | null
  ) {}

  public get tag(): string {
    return this._tag;
  }
  public set tag(value: string) {
    this._tag = value;
  }

  public get tuit(): Tuit | null {
    return this._tuit;
  }
  public set tuit(value: Tuit | null) {
    this._tuit = value;
  }


  

}
