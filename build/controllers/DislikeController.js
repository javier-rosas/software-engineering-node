"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DislikeDao_1 = __importDefault(require("../daos/DislikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
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
class DislikesController {
    constructor() {
        /**
          * Finds if a user has disliked a Tuit
          * @param {Request} req Represents request from client, including the path
          * parameter tid representing the disliked tuit and uid representing the user id
          * @param {Response} res Represents response to client including the dislike model
          */
        this.findUserDislikesTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            if (userId === "me")
                return;
            try {
                DislikesController.dislikeDao.findUserDislikesTuit(userId, tid)
                    .then(dislike => res.json(dislike));
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
        /***
         * User toggles the dislike button
         * @param {Request} req Represents request from client, including the path
          * parameter tid representing the liked tuit and the uid representing the user id
          * @param {Response} res Represents status of the request
         */
        this.userTogglesTuitDisLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                const userAlreadyDislikedTuit = yield DislikesController.dislikeDao
                    .findUserDislikesTuit(userId, tid);
                const userAlreadyLikedTuit = yield DislikesController.likeDao
                    .findUserLikesTuit(userId, tid);
                const howManyDislikedTuit = yield DislikesController.dislikeDao
                    .countHowManyDislikedTuit(tid);
                const howManyLikedTuit = yield DislikesController.likeDao
                    .countHowManyLikedTuit(tid);
                let tuit = yield DislikesController.tuitDao.findTuitById(tid);
                if (userAlreadyDislikedTuit && !userAlreadyLikedTuit) {
                    yield DislikesController.dislikeDao.userUnDislikesTuit(userId, tid);
                    tuit._stats._dislikes = howManyDislikedTuit - 1;
                }
                else if (!userAlreadyDislikedTuit && !userAlreadyLikedTuit) {
                    yield DislikesController.dislikeDao.userDislikesTuit(userId, tid);
                    tuit._stats._dislikes = howManyDislikedTuit + 1;
                }
                else if (!userAlreadyDislikedTuit && userAlreadyLikedTuit) {
                    yield DislikesController.dislikeDao.userDislikesTuit(userId, tid);
                    yield DislikesController.likeDao.userUnlikesTuit(userId, tid);
                    tuit._stats._dislikes = howManyDislikedTuit + 1;
                    tuit._stats._likes = howManyLikedTuit - 1;
                }
                yield DislikesController.tuitDao.updateLikes(tid, tuit._stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
exports.default = DislikesController;
DislikesController.dislikeDao = DislikeDao_1.default.getInstance();
DislikesController.tuitDao = TuitDao_1.default.getInstance();
DislikesController.likeDao = LikeDao_1.default.getInstance();
DislikesController.dislikeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
DislikesController.getInstance = (app, dislikeDao) => {
    if (DislikesController.dislikeController === null) {
        DislikesController.dislikeController = new DislikesController();
        app.get("/api/users/:uid/dislikes/:tid", DislikesController.dislikeController.findUserDislikesTuit);
        app.put("/api/users/:uid/dislikes/:tid", DislikesController.dislikeController.userTogglesTuitDisLikes);
        DislikesController.dislikeDao = dislikeDao;
    }
    return DislikesController.dislikeController;
};
