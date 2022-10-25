/**
 * @file declares Location class
 */

/**
 * @class Location declares Location data type and functionality
 * @property {number} _latitude 
 * @property {number} _longitude 
 */
export default class Location {
  
  constructor(
    private _latitude?: number,
    private _longitude?: number
  ) {}

  public get latitude(): number | undefined{
    return this._latitude;
  }

  public set latitude(value: number | undefined) {
    this._latitude = value;
  }

  public get longitude(): number | undefined {
    return this._longitude;
  }
  
  public set longitude(value: number | undefined) {
    this._longitude = value;
  }



};
