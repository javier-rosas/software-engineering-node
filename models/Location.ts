export default class Location {

  private latitude: number;
  private longitude: number;

  constructor(latitude: number, longitude: number){
    this.latitude = latitude
    this.longitude = longitude
  }

  public set setLatitude(latitude: number){
    this.latitude = latitude
  }

  public set setLongitude(longitude: number){
    this.longitude = longitude
  }

  public get getLongitude() : number {
    return this.longitude
  }

  public get getLatitude(): number {
    return this.latitude
  }

};
