/**
 * @file Declares UserDao interface
 */

import User from "../models/User";

/**
 * @method findAllUsers gets all users in the user collection 
 * @method findUserById gets specific user by id 
 * @method createUser creates a new user in the user collection 
 * @method deleteUser deletes a user from the user collection
 */
export default interface UserDaoI {
   findAllUsers(): Promise<User[]>;
   findUserById(uid: string): Promise<any>;
   createUser(user: User): Promise<User>;
   updateUser(uid: string, user: User): Promise<any>;
   deleteUser(uid: string): Promise<any>;
}
