import Tuit from './Tuit'

export default class Tuit2Topic {
  
  private topic: string
  private tuit: Tuit | null

  constructor(topic: string, tuit: Tuit | null) {
    this.topic = topic
    this.tuit = tuit
  }

  public set setTopic(topic: string) {
    this.topic = topic
  }

  public set setTuit(tuit: Tuit | null) {
    this.tuit = tuit
  }

  public get getTopic(): string { 
    return this.topic
  }

  public get getTuit() : Tuit | null {
    return this.tuit
  }
  
}