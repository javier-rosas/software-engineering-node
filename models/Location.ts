export default class Location {
  
  constructor(
    private _latitude: number,
    private _longitude: number
  ) {}

  public get latitude(): number {
    return this._latitude;
  }

  public set latitude(value: number) {
    this._latitude = value;
  }

  public get longitude(): number {
    return this._longitude;
  }
  
  public set longitude(value: number) {
    this._longitude = value;
  }



};
