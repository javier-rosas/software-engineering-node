import Tuit from './Tuit'

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
