import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI {
  createBookmark(uid: string, tid: string): Promise<Bookmark>;
  unBookmark(uid: string, tid: string): Promise<any>;
  getAllBookmarkedTuitsbyUser(uid: string): Promise<Bookmark[]>;
}