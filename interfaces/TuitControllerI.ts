/**
 * @file Declares TuitControllerI interface
 */
import { Request, Response } from "express"

/**
 * @method createTuit creates new Tuit in the tuit collection
 * @method findTuitsByUser gets tuits by specific user 
 * @method findAllTuits gets all tuits 
 * @method findTuitById finds a tuit by id
 * @method updateTuit updates tuit by id
 * @method deleteTuit deletes tuit from the tuit collection 
 */
export default interface TuitControllerI {
  createTuit (req: Request, res: Response): void;
  findTuitsByUser (req: Request, res: Response): void;
  findAllTuits (req: Request, res: Response): void;
  findTuitById (req: Request, res: Response): void;
  updateTuit (req: Request, res: Response): void;
  deleteTuit (req: Request, res: Response): void;
};
