export default class Tag {
  
  constructor(private _tag: string) {}

  public get tag(): string {
    return this._tag;
  }
  
  public set tag(value: string) {
    this._tag = value;
  }
  
}
