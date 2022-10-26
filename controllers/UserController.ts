/**
 * @file Controller RESTful Web service API for user resource
 */

import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";


 /**
  * @class UserController Implements RESTful Web service API for user resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li> GET /api/users to retrieve all the users </li>
  *     <li> GET /api/users/:userID to retrieve user by ID </li>
  *     <li> POST /api/users to create a new user </li>
  *     <li> DELETE /api/users/:userid to delete a user </li>
  *     <li> PUT /api/users/:userid to update a user </li>
  * </ul>
  * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
  * @property {UserController} userController Singleton controller implementing
  * RESTful Web service API
  */
export default class UserController implements UserControllerI {

  private static userController: UserControllerI | null = null;

  private static userDao: UserDao;

  /**
  * Creates singleton controller instance
  * @param {Express} app Express instance to declare the RESTful Web service
  * API
  * @return UserController
  */
  public static getInstance = (app: Express, userDao: UserDao): UserControllerI => {

    if (UserController.userController === null) {
      UserController.userController = new UserController();
    }

    UserController.userDao = userDao;

    app.get('/api/users', UserController.userController.findAllUsers);
    app.get('/api/users/:userid', UserController.userController.findUserById);
    app.post('/api/users', UserController.userController.createUser);
    app.delete('/api/users/:userid', UserController.userController.deleteUser);
    app.put('/api/users/:userid', UserController.userController.updateUser);

    return UserController.userController;
  }

  constructor() {}

  /**
  * Retrieves all users from the database
  * @param {Request} req Represents request from client
  * @param {Response} res Represents response to client, including the
  * body formatted as a JSON array containing the user objects
  */
  findAllUsers = (req: Request, res: Response) => 
    UserController.userDao.findAllUsers()
      .then(users => res.json(users));
  
  /**
  * Retrieves user by id
  * @param {Request} req Represents request from client, including the
  * parameter userid representing the user
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON containing the user object 
  */
  findUserById = (req: Request, res: Response) =>
    UserController.userDao.findUserById(req.params.userid)
        .then(user => res.json(user));

  /**
  * Creates new user
  * @param {Request} req Represents request from client, including 
  * the body, which contains the user object
  * @param {Response} res Represents response to client, including the newly created user object
  */
  createUser = (req: Request, res: Response) => 
    UserController.userDao.createUser(req.body)
      .then(user => res.json(user));
  
  /**
  * Deletes user from database
  * @param {Request} req Represents request from client, including 
  * the parameter userid, which represents the user id 
  * @param {Response} res Represents response to client, including the status of the response
  */
  deleteUser = (req: Request, res: Response) =>
    UserController.userDao.deleteUser(req.params.userid)
      .then(status => res.json(status));


  /**
  * Updates user in the database
  * @param {Request} req Represents request from client, including 
  * the parameter userid, which represents the user id and the body which contains the user object
  * @param {Response} res Represents response to client, including the status of the response
  */
  updateUser = (req: Request, res: Response) =>
    UserController.userDao.updateUser(req.params.userid, req.body)
      .then(status => res.json(status));

}
