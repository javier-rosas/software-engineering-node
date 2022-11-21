/**
 * @file implements Tuit data access object
 */

import Tuit from '../models/Tuit'
import tuitModel from '../mongoose/TuitModel'
import TuitDaoI from '../interfaces/TuitDaoI'

/**
* @class TuitDao Implements Data access object for tuit resource
*/
export default class TuitDao implements TuitDaoI {

  private static tuitDao: TuitDao | null = null;

  /**
  * Creates singleton dao instance
  * @return TuitDao
  */
  public static getInstance = (): TuitDao => {
      if (TuitDao.tuitDao === null) {
          TuitDao.tuitDao = new TuitDao();
      }
      return TuitDao.tuitDao;
  }
  
  private constructor() {}

  /**
  * Retrieves a single Tuit by id
  * @param {string} id Tuit id
  * @returns single Tuit object
  */
  async findTuitById(_id: string): Promise<any> {
    const tuitMongooseModel = await tuitModel.findById({_id}).populate('_postedBy').exec();
    return tuitMongooseModel;
  }

  /**
  * Retrieves all Tuits in the database
  * @returns list of all Tuit objects
  */
  async findAllTuits(): Promise<any[]> {
    const tuitMongooseModels = await tuitModel.find().populate('_postedBy').exec()
    return tuitMongooseModels
  }
  
  /**
  * Retrieves all Tuits posted by a user
  * @param {string} authorId user id
  * @returns list of all Tuit objects 
  */
  async findTuitsByUser(authorId: string): Promise<any[]> {
    const tuitMongooseModels = await tuitModel.find({_postedBy: authorId}).populate('_postedBy').exec()
    return tuitMongooseModels
  }

  /**
  * Creates a new Tuit in the database
  * @param {Tuit} tuit Tuit object to insert in the database
  * @returns {Tuit} Tuit object inserted in the database
  */
  async createTuit(tuit: Tuit): Promise<Tuit> {
    const tuitMongooseModel = await tuitModel.create(tuit);
    return new Tuit(
      tuitMongooseModel?._id.toString() ?? '',
      tuitMongooseModel?._tuit ?? '',
      new Date(tuitMongooseModel?._postedOn ?? (new Date())),
      tuitMongooseModel?._postedBy?.toString() ?? '',
    )
  }

  /**
  * Deletes a new Tuit from the database
  * @param {string} tuitId Tuit id to delete
  * @returns {any} status of the request
  */
  async deleteTuit(tuitId: string): Promise<any> {
    return await tuitModel.deleteOne({_id: tuitId});
  }

  async deleteTuitsByUserId(_postedBy: string): Promise<any> {
    return await tuitModel.deleteOne({_postedBy: _postedBy});
  }

  /**
  * Updates a Tuit in the database
  * @param {string} tuitId Tuit id to update
  * @param {Tuit} tuit Tuit object 
  * @returns {any} status of the request
  */
  async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
    return await tuitModel.updateOne({_id: tuitId}, tuit)
  }

  /**
   * Update the amount of likes in a function 
   * @param tid tuit id 
   * @param newStats object with the new stats 
   * @returns status of update 
   */
  updateLikes = async (tid: string, newStats: number) =>
    tuitModel.updateOne(
        {_id: tid},
        {$set: {_stats: newStats}});

} 



