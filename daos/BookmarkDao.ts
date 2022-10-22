import Bookmark from '../models/Bookmark'
import BookmarkModel from '../mongoose/BookmarkModel'
import BookmarkDaoI from '../interfaces/BookmarkDaoI'

export default class BookmarkDao implements BookmarkDaoI {

  private static bookmarkDao: BookmarkDao | null = null;

  public static getInstance = (): BookmarkDao => {
      if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
      }
      return BookmarkDao.bookmarkDao;
  }
  
  private constructor() {}
  
  async createBookmark(uid: string, tid: string): Promise<Bookmark> {
    const bookmarkMongooseModel = await BookmarkModel.create({_bookmarkedUserId: uid, _bookmarkedTuitId: tid})
    return new Bookmark({
      _id: bookmarkMongooseModel?._id.toString() ?? '',
      _bookmarkedTuitId: bookmarkMongooseModel?._bookmarkedTuitId.toString() ?? '',
      _bookmarkedUserId: bookmarkMongooseModel?._bookmarkedUserId.toString() ?? ''
    })
  }

  async unBookmark(uid: string, tid: string): Promise<any> {
    return await BookmarkModel.deleteOne({_bookmarkedUserId: uid, _bookmarkedTuitId: tid});
  }
  
  async getAllBookmarkedTuitsbyUser(uid: string): Promise<Bookmark[]> {
    const bookmarkMongooseModels = await BookmarkModel.find({_bookmarkedTuitId: uid});
    const bookmarkModels = bookmarkMongooseModels.map((bookmark) => {
      return new Bookmark({
        _id: bookmark?._id.toString() ?? '',
        _bookmarkedTuitId: bookmark?._bookmarkedTuitId.toString() ?? '',
        _bookmarkedUserId: bookmark?._bookmarkedUserId.toString() ?? ''
      })
    })
    return bookmarkModels
  }


}
