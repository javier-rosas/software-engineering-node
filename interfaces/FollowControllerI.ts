import {Request, Response} from "express";

/**
 * @file Declares API for Follows controller
 */
export default interface FollowControllerI {
  followUser (req: Request, res: Response): void;
  unFollowUser (req: Request, res: Response): void;
  getFollowing (req: Request, res: Response): void;
  getFollowers (req: Request, res: Response): void;
}