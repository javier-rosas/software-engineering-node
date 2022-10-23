import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import { Request, Response, Express } from "express";


export default class BookmarkController implements BookmarkControllerI {

  private static bookmarkController: BookmarkControllerI | null = null;

  private static bookmarkDao: BookmarkDaoI;

  public static getInstance = (app: Express, bookmarkDao: BookmarkDaoI): BookmarkController => {

    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
    }

    BookmarkController.bookmarkDao = bookmarkDao;
    
    app.post('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.createBookmark);
    app.delete('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.unBookmark);
    app.get('/api/users/:uid/bookmarks', BookmarkController.bookmarkController.getAllBookmarkedTuitsbyUser);

    return BookmarkController.bookmarkController;
  }

  private constructor() {}

  createBookmark(req: Request, res: Response): void {
    BookmarkController.bookmarkDao
      .createBookmark(req.params.uid, req.params.tid)
      .then(bookmark => res.json(bookmark));
  }

  unBookmark(req: Request, res: Response): void {
    BookmarkController.bookmarkDao
      .unBookmark(req.params.uid, req.params.tid)
      .then(status => res.json(status));
  }

  getAllBookmarkedTuitsbyUser(req: Request, res: Response): void {
    BookmarkController.bookmarkDao
      .getAllBookmarkedTuitsbyUser(req.params.uid)
      .then(tuits => res.json(tuits));
  }
  
}
