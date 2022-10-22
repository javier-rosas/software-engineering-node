import BookmarkI from '../interfaces/BookmarkI'

export default class Bookmark {

  private _id?: string 
  private _bookmarkedTuitId?: string   
  private _bookmarkedUserId?: string

  constructor({
		_id,
		_bookmarkedTuitId,
    _bookmarkedUserId
	} : BookmarkI) {
		this.id = _id
		this._bookmarkedTuitId=  _bookmarkedTuitId
		this._bookmarkedUserId = _bookmarkedUserId
	}

  // id
  public get id(): string | undefined {
    return this._id
  }
  public set id(value: string | undefined) {
    this._id = value
  }

  // bookmarkedTuitId
  public get bookmarkedTuitId(): string | undefined {
    return this._bookmarkedTuitId
  }
  public set bookmarkedTuitId(value: string | undefined) {
    this._bookmarkedTuitId = value
  }

  // bookmarkedUserId
  public get bookmarkedUserId(): string | undefined {
    return this._bookmarkedUserId
  }
  public set bookmarkedUserId(value: string | undefined) {
    this._bookmarkedUserId = value
  }

}

