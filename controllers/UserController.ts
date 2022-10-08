import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";


export default class UserController implements UserControllerI {

  private static userController: UserControllerI | null = null;

  private static userDao: UserDao;
  
  public static getInstance = (app: Express, userDao: UserDao): UserControllerI => {

    if (UserController.userController === null) {
      UserController.userController = new UserController();
    }

    UserController.userDao = userDao;

    app.get('/users', UserController.userController.findAllUsers);
    app.get('/users/:userid', UserController.userController.findUserById);
    app.post('/users', UserController.userController.createUser);
    app.delete('/users/:userid', UserController.userController.deleteUser);
    app.put('/users/:userid', UserController.userController.updateUser);

    return UserController.userController;
  }

  constructor() {}

  findAllUsers = (req: Request, res: Response) => {
    UserController.userDao.findAllUsers()
      .then(users => res.json(users));
  }
  
  findUserById = (req: Request, res: Response) =>
    UserController.userDao.findUserById(req.params.userid)
        .then(user => res.json(user));

  createUser = (req: Request, res: Response) => { 
    UserController.userDao.createUser(req.body)
      .then(user => res.json(user));
  }
  
  deleteUser = (req: Request, res: Response) =>
    UserController.userDao.deleteUser(req.params.userid)
      .then(status => res.json(status));

  updateUser = (req: Request, res: Response) =>
    UserController.userDao.updateUser(req.params.userid, req.body)
      .then(status => res.json(status));

}
