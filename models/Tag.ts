export default class Tag {

  private tag: string
  
  constructor(tag: string) {
    this.tag = tag 
  }

  public set setTag(tag: string) {
    this.tag = tag
  }

  public get getTag() : string {
    return this.tag
  }
}
