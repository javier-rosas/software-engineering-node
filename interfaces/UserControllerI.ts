/**
 * @file Declares UserControllerI interface
 */
import {Request, Response} from "express";


/**
 * @method findAllUsers gets all users in the user collection 
 * @method findUserById gets specific user by id 
 * @method createUser creates a new user in the user collection 
 * @method deleteUser deletes a user from the user collection
 */
export default interface UserControllerI {
   findAllUsers(req: Request, res: Response): void;
   findUserById(req: Request, res: Response): void;
   createUser(req: Request, res: Response): void;
   deleteUser(req: Request, res: Response): void;
   updateUser(req: Request, res: Response): void;
   deleteUserbyUsername(req: Request, res: Response): void;
}
