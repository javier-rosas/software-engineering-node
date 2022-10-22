import Bookmark from "../models/Bookmark";
import Tuit from "../models/Tuit"

export default interface BookmarkDaoI {
  createBookmark(uid: string, tid: string): Promise<Bookmark>
  unBookmark(uid: string, tid: string): Promise<any>
  getAllBookmarkedTuitsbyUser(uid: string): Promise<Tuit[]>
}