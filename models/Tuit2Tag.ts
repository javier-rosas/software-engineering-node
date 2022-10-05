import Tuit from './Tuit'

export default class Tuit2Tag {

  private tag: string;
  private tuit: Tuit | null;

  constructor(tag: string, tuit: Tuit | null) {
    this.tag = tag
    this.tuit = tuit
  }

  public set setTag(tag: string) { this.tag = tag }

  public set setTuit(tuit: Tuit | null) { this.tuit = tuit }

  public get getTag(): string { return this.tag }

  public get getTuit(): Tuit | null { return this.tuit }

}
