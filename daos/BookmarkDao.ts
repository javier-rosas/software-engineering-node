/**
 * @file implements BookmarkDao data access object
*/

import Bookmark from '../models/Bookmark'
import Tuit from '../models/Tuit'
import BookmarkModel from '../mongoose/BookmarkModel'
import BookmarkDaoI from '../interfaces/BookmarkDaoI'

/**
* @class BookmarkDao implements Data access object for bookmarks resource
*/
export default class BookmarkDao implements BookmarkDaoI {

  private static bookmarkDao: BookmarkDao | null = null;

  /**
  * Creates singleton dao instance
  * @return BookmarkDao
  */
  public static getInstance = (): BookmarkDao => {
      if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
      }
      return BookmarkDao.bookmarkDao;
  }
  
  private constructor() {}

  /**
    * User bookmarks a Tuit
    * @param {string} uid user id 
    * @param {string} tid tuit id 
    * @returns {Bookmark} Bookmark relationship object
  */
  async createBookmark(uid: string, tid: string): Promise<Bookmark> {
    const bookmarkMongooseModel = await BookmarkModel.create({_bookmarkedUserId: uid, _bookmarkedTuitId: tid})
    return new Bookmark({
      _id: bookmarkMongooseModel?._id.toString() ?? '',
      _bookmarkedTuitId: bookmarkMongooseModel?._bookmarkedTuitId.toString() ?? '',
      _bookmarkedUserId: bookmarkMongooseModel?._bookmarkedUserId.toString() ?? ''
    })
  }

  /**
    * User unbookmarks a Tuit
    * @param {string} uid user id 
    * @param {string} tid tuit id 
    * @returns {any} status 
  */
  async unBookmark(uid: string, tid: string): Promise<any> {
    return await BookmarkModel.deleteOne({_bookmarkedUserId: uid, _bookmarkedTuitId: tid})
  }
  
  /**
    * Get all bookmarked tuits by a user 
    * @param {string} uid user id 
    * @returns {Tuit[]} list of Tuit objects  
  */
  async getAllBookmarkedTuitsbyUser(uid: string): Promise<any> {
    const tuitMongooseModels = await BookmarkModel.find({_bookmarkedUserId: uid}).populate('_bookmarkedTuitId').exec()
    const tuitModels = tuitMongooseModels.map((tuit) => {
      return tuit._bookmarkedTuitId
    })
    return tuitModels
  }

}
