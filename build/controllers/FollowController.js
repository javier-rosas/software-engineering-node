"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followed to retrieve all the users's followers
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve the list of users being followed by the user in question
 *     </li>
 *     <li>POST /api/users/:uid1/users/:uid2/follows to record follow relationship (uid1 follows uid2)
 *     </li>
 *     <li>DELETE /api/users/:uid1/users/:uid2/follows to delete a follow relationshipt (uid1 unfollows uid2)
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    constructor() { }
    /**
      * Creates follow relationship in database
      * @param {Request} req Represents request from client, including the path
      * parameter uid1 representing the user following uid2
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the follow relationship
    */
    followUser(req, res) {
        FollowController.followDao
            .followUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));
    }
    /**
      * Deletes follow relationship in database
      * @param {Request} req Represents request from client, including the path
      * parameter uid1 representing the user unfollowing uid2
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the status of the request
    */
    unFollowUser(req, res) {
        FollowController.followDao
            .unFollowUser(req.params.uid1, req.params.uid2)
            .then(status => res.json(status));
    }
    /**
      * Retrieves the list of users being followed by the user in question
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user in question
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
    */
    getFollowing(req, res) {
        FollowController.followDao
            .getFollowing(req.params.uid)
            .then(users => res.json(users));
    }
    /**
      * Retrieves the user's followers from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user in question
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
    */
    getFollowers(req, res) {
        FollowController.followDao
            .getFollowers(req.params.uid)
            .then(users => res.json(users));
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
* Creates singleton controller instance
* @param {Express} app Express instance to declare the RESTful Web service
* API
* @return FollowController
*/
FollowController.getInstance = (app, followDao) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.get("/api/users/:uid/followers", FollowController.followController.getFollowers);
        app.get("/api/users/:uid/following", FollowController.followController.getFollowing);
        app.post("/api/users/:uid1/users/:uid2/follows", FollowController.followController.followUser);
        app.delete("/api/users/:uid1/users/:uid2/follows", FollowController.followController.unFollowUser);
        FollowController.followDao = followDao;
    }
    return FollowController.followController;
};
