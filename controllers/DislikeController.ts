/**
 * @file Controller RESTful Web service API for dislikes resource
 */
 import {Express, Request, Response} from "express";
 import DislikeDao from "../daos/DislikeDao";
 import TuitDao from "../daos/TuitDao";
 import LikeDao from '../daos/LikeDao'
    
 /**
  * @class DislikeController Implements RESTful Web service API for dislikes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>
  *       PUT /api/users/:uid/likes/:tid to dislike a particular Tuit
  *     </li>
  * </ul>
  * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
  * @property {DislikesController} DislikesController Singleton controller implementing
  * RESTful Web service API
  * @property {TuitDao} tuitDao Singleton DAO implementing Tuit CRUD operations
  */
  export default class DislikesController {
    private static dislikeDao = DislikeDao.getInstance();
    private static tuitDao = TuitDao.getInstance()
    private static likeDao = LikeDao.getInstance()

    private static dislikeController: DislikesController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express, dislikeDao: any): DislikesController => {
        if(DislikesController.dislikeController === null) {
          DislikesController.dislikeController = new DislikesController();
          app.get("/api/users/:uid/dislikes/:tid", DislikesController.dislikeController.findUserDislikesTuit);
          app.put("/api/users/:uid/dislikes/:tid", DislikesController.dislikeController.userTogglesTuitDisLikes)
          DislikesController.dislikeDao = dislikeDao
        }
        return DislikesController.dislikeController;
    }

    private constructor() {}    


    /**
      * Finds if a user has disliked a Tuit
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the disliked tuit and uid representing the user id
      * @param {Response} res Represents response to client including the dislike model 
      */
    findUserDislikesTuit = async (req: any, res: Response) => {
      const uid = req.params.uid;
      const tid = req.params.tid;
      const profile = req.session['profile'];
      const userId = uid === "me" && profile ? profile._id : uid;
      if (userId === "me") return
      try {
        DislikesController.dislikeDao.findUserDislikesTuit(userId, tid)
        .then(dislike => res.json(dislike));
      } catch (e) {
        res.sendStatus(404);
      }
    }
      

    
    /***
     * User toggles the dislike button 
     * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit and the uid representing the user id 
      * @param {Response} res Represents status of the request
     */
     userTogglesTuitDisLikes = async (req: any, res: Response) => {
      const uid = req.params.uid;
      const tid = req.params.tid;
      const profile = req.session['profile'];
      const userId = uid === "me" && profile ? profile._id : uid;
      try {
          const userAlreadyDislikedTuit = await DislikesController.dislikeDao
            .findUserDislikesTuit(userId, tid);
          const userAlreadyLikedTuit = await DislikesController.likeDao
            .findUserLikesTuit(userId, tid);
          const howManyDislikedTuit = await DislikesController.dislikeDao
            .countHowManyDislikedTuit(tid);
          const howManyLikedTuit = await DislikesController.likeDao
            .countHowManyLikedTuit(tid);
          let tuit = await DislikesController.tuitDao.findTuitById(tid);
          if (userAlreadyDislikedTuit && !userAlreadyLikedTuit) {
              await DislikesController.dislikeDao.userUnDislikesTuit(userId, tid);
              tuit._stats._dislikes = howManyDislikedTuit - 1;
          } else if (!userAlreadyDislikedTuit && !userAlreadyLikedTuit) {
              await DislikesController.dislikeDao.userDislikesTuit(userId, tid);
              tuit._stats._dislikes = howManyDislikedTuit + 1;
          } else if (!userAlreadyDislikedTuit  && userAlreadyLikedTuit) {
              await DislikesController.dislikeDao.userDislikesTuit(userId, tid);
              await DislikesController.likeDao.userUnlikesTuit(userId, tid)
              tuit._stats._dislikes = howManyDislikedTuit + 1;
              tuit._stats._likes = howManyLikedTuit -1;
          }
          await DislikesController.tuitDao.updateLikes(tid, tuit._stats);
          res.sendStatus(200);
      } catch (e) {
          res.sendStatus(404);
      }
  }

}