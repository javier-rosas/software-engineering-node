export default class Topic {

  private topic: string;

  constructor(topic: string) {
    this.topic = topic
  }

  public set setTopic(topic: string) {
    this.topic = topic
  }

  public get getTopic(): string {
    return this.topic
  }
  
}