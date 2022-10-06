export default class Topic {

  private _topic: string;

  constructor(topic: string) {
    this._topic = topic
  }

  public get topic(): string {
    return this._topic;
  }
  public set topic(value: string) {
    this._topic = value;
  }


  
}