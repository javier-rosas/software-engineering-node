export default class Topic {
  
  constructor(private _topic: string) {}

  public get topic(): string {
    return this._topic;
  }

  public set topic(value: string) {
    this._topic = value;
  }  
}