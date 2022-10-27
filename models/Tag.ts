/**
 * @file Declares Tag class
 */


/**
 * @class Tag encloses Tag data and functionality 
 * @property {string} _tag tag data
 */
export default class Tag {
  
  constructor(private _tag: string) {}

  public get tag(): string {
    return this._tag;
  }
  
  public set tag(value: string) {
    this._tag = value;
  }
  
}
