import BookmarkI from '../interfaces/BookmarkI'

export default class Bookmark {

  private _id: string 
  private _bookmarkedTuitId: string   
  private _bookmarkedUserId: string

  constructor({
		_id,
		_bookmarkedTuitId,
    _bookmarkedUserId
	} : BookmarkI) {
		this._id = _id
		this._bookmarkedTuitId=  _bookmarkedTuitId
		this._bookmarkedUserId = _bookmarkedUserId
	}

  // id
  public get id(): string {
    return this._id
  }
  public set id(value: string) {
    this._id = value
  }

  // bookmarkedTuitId
  public get bookmarkedTuitId(): string {
    return this._bookmarkedTuitId
  }
  public set bookmarkedTuitId(value: string) {
    this._bookmarkedTuitId = value
  }

  // bookmarkedUserId
  public get bookmarkedUserId(): string {
    return this._bookmarkedUserId
  }
  public set bookmarkedUserId(value: string) {
    this._bookmarkedUserId = value
  }

}

