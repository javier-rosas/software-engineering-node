/**
 * @file Declares Tuit2Topic class
 */

import Tuit from './Tuit'

 /**
  * @class Tuit2Topic encloses user 2 topic data structure
  * @property {string} _id 
  * @property {string} _username 
	**/
export default class Tuit2Topic {
  
  constructor(
    private _topic: string,
    private _tuit: Tuit | null
  ) {}


  public get topic(): string {
    return this._topic;
  }

  public set topic(value: string) {
    this._topic = value;
  }
    
	public get tuit(): Tuit | null {
		return this._tuit;
	}

	public set tuit(value: Tuit | null) {
		this._tuit = value;
	}

  
  
 
  
}