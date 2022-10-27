/**
 * @file Declares API for BookmarkControllerI
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
   createBookmark(req: Request, res: Response): void;
   unBookmark(req: Request, res: Response): void;
   getAllBookmarkedTuitsbyUser(req: Request, res: Response): void;
}
