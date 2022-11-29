/**
 * @file Controller RESTful Web service API for tuit resource
 */

import TuitControllerI from "../interfaces/TuitControllerI";
import TuitDaoI from "../interfaces/TuitDaoI";
import { Request, Response, Express } from "express";

 /**
  * @class TuitController Implements RESTful Web service API for tuit resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li> GET /api/tuits to retrieve all the tuits </li>
  *     <li> GET /api/tuits/:tid to retrieve tuit by ID </li>
  *     <li> GET /api/users/:uid/tuits to retrieve a user's tuits </li>
  *     <li> POST /api/users/:uid/tuits for a user to create a new tuit </li>
  *     <li> DELETE /api/tuits/:tid to delete a tuit by id </li>
  *     <li> PUT /api/tuits/:tid to update a tuit </li>
  * </ul>
  * @property {TuitDaoI} tuitDao Singleton DAO implementing tuit CRUD operations
  * @property {TuitController} tuitController Singleton controller implementing
  * RESTful Web service API
  */
export default class TuitController implements TuitControllerI {

  private static tuitController: TuitController | null = null;

  private static tuitDao: TuitDaoI;

  /**
  * Creates singleton controller instance
  * @param {Express} app Express instance to declare the RESTful Web service
  * API
  * @return TuitController
  */
  public static getInstance = (app: Express, tuitDao: TuitDaoI): TuitController => {

    if (TuitController.tuitController === null) {
      TuitController.tuitController = new TuitController();
    }

    TuitController.tuitDao = tuitDao;
    
    app.get('/api/tuits', TuitController.tuitController.findAllTuits);
    app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
    app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
    app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuit);
    app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
    app.delete('/api/users/:uid/tuits', TuitController.tuitController.deleteTuitsByUserId);
    app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);

    return TuitController.tuitController;
  }

  private constructor() {}

  /**
  * Retrieves all tuits from the database
  * @param {Request} req Represents request from client
  * @param {Response} res Represents response to client, including the
  * body formatted as a JSON array containing the tuit objects
  */
  findAllTuits = (req: Request, res: Response) => {
    TuitController.tuitDao
      .findAllTuits()
      .then(tuits => res.json(tuits));
  } 
  
  /**
  * Retrieves tuit by id
  * @param {Request} req Represents request from client, including the
  * parameter tid representing the tuit id
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON containing the tuit object
  */
  findTuitById = (req: Request, res: Response)  => {
    TuitController.tuitDao
      .findTuitById(req.params.tid)
      .then(tuit => res.json(tuit));
  }

  /**
  * Retrieves tuits by user
  * @param {Request} req Represents request from client, including the
  * parameter uid representing the user id
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON array containing the tuit objects
  */
  findTuitsByUser = (req: any, res: Response) => {
    const userId = req.params.uid === "me" && req.session['profile'] ?
                 req.session['profile']._id : req.params.uid;
     TuitController.tuitDao
      .findTuitsByUser(userId)
        .then((tuits) => {
          res.json(tuits)
        })
        .catch((e) => {
          console.log(e)
        })
  }

  /**
  * Creates new tuit
  * @param {Request} req Represents request from client, including the body, which contains the tuit object
  * @param {Response} res Represents response to client, including the newly created tuit object
  */
  createTuit = (req: any, res: Response) => {
    const userId = req.body.uid === "me" && req.session['profile'] ?
                   req.session['profile']._id : req.params.uid
    
    req.body._postedBy = userId
    TuitController.tuitDao
      .createTuit(req.body)
      .then(tuit => {
        res.json(tuit)
      });
  }
  

  /**
  * Deletes tuit from database
  * @param {Request} req Represents request from client, including
  * the parameter tid, which represents the tuit id 
  * @param {Response} res Represents response to client, including the status of the response
  */
  deleteTuit = (req: Request, res: Response) => {
    TuitController.tuitDao
      .deleteTuit(req.params.tid)
      .then(status => res.json(status));
  }

  /**
   * Delete all tuits by a user 
   * @param req Represents request from client, including 
   * the parameter uid, which represents the user id 
   * @param res Status of the response
   */
  deleteTuitsByUserId = (req: Request, res: Response) => {
    TuitController.tuitDao
      .deleteTuitsByUserId(req.params.uid)
      .then(status => res.json(status));
  }

  /**
  * Updates tuit in the database
  * @param {Request} req Represents request from client, including 
  * the parameter tid, which represents the tuit id and the body which contains the tuit object
  * @param {Response} res Represents response to client, including the status of the response
  */
  updateTuit = (req: Request, res: Response) => {
    TuitController.tuitDao
      .updateTuit(req.params.tid, req.body)
      .then(status => res.json(status));
  }
}
