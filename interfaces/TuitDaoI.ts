/**
 * @file Declares TuitDao interface
 */
import Tuit from "../models/Tuit";

/**
 * @method findAllTuits gets all tuits in the tuit collection 
 * @method findTuitsByUser gets tuits posted by specfic user
 * @method findTuitById gets specific tuit by tuit id
 * @method createTuit creates a new tuit in the tuit collection
 * @method updateTuit updates a tuit from the tuit collection
 * @method deleteTuit deletes a tuit from the tuit collection
 */
export default interface TuitDao {
   findAllTuits(): Promise<Tuit[]>;
   findTuitsByUser(uid: string): Promise<Tuit[]>;
   findTuitById(tid: string): Promise<Tuit>;
   createTuit(tuit: Tuit): Promise<Tuit>;
   updateTuit(tid: string, tuit: Tuit): Promise<any>;
   deleteTuit(tid: string): Promise<any>;
}
