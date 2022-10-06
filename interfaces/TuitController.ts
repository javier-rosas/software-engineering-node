import { Request, Response } from "express"

export default interface TuitControllerI {
  createTuit (req: Request, res: Response): void;
  findTuitsByUser (req: Request, res: Response): void;
  findAllTuits (req: Request, res: Response): void;
  findTuitById (req: Request, res: Response): void;
  updateTuit (req: Request, res: Response): void;
  deleteTuit (req: Request, res: Response): void;
};
