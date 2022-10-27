/**
 * @file Declares Topic class
 */

/**
 * @class Topic encloses Topic data and functionality
 * @property {string} _topic topic data
 */
export default class Topic {
  
  constructor(private _topic: string) {}

  public get topic(): string {
    return this._topic;
  }

  public set topic(value: string) {
    this._topic = value;
  }  
}