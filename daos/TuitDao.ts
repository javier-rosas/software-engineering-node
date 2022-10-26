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
  async findTuitById(id: string): Promise<Tuit> {
    const tuitMongooseModel = await tuitModel.findById(id)//.populate('postedBy').exec();
    const tuit = new Tuit(
      tuitMongooseModel?._id.toString() ?? '',
      tuitMongooseModel?._tuit ?? '',
      new Date(tuitMongooseModel?._postedOn ?? (new Date()))
    )
    return tuit;
  }

  /**
  * Retrieves all Tuits in the database
  * @returns list of all Tuit objects
  */
  async findAllTuits(): Promise<Tuit[]> {
    const tuitMongooseModels = await tuitModel.find();
    const tuitModels = tuitMongooseModels.map((tuitMongooseModel) => {
      return new Tuit(
        tuitMongooseModel?._id.toString() ?? '',
        tuitMongooseModel?._tuit ?? '',
        new Date(tuitMongooseModel?._postedOn ?? (new Date())),
        tuitMongooseModel?._postedBy ?? '',
      )
    })
    return tuitModels;
  }
  
  /**
  * Retrieves all Tuits posted by a user
  * @param {string} authorId user id
  * @returns list of all Tuit objects 
  */
  async findTuitsByUser(authorId: string): Promise<Tuit[]> {
    const tuitMongooseModels = await tuitModel.find({_postedBy: authorId})//.populate('tuit').exec()
    const tuitModels = tuitMongooseModels.map((tuitMongooseModel) => {
      return new Tuit(
        tuitMongooseModel?._id.toString() ?? '',
        tuitMongooseModel?._tuit ?? '',
        new Date(tuitMongooseModel?._postedOn ?? (new Date())),
        tuitMongooseModel?._postedBy ?? ''
      )
    })
    return tuitModels
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
      tuitMongooseModel?._postedBy.toString() ?? '',
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

  /**
  * Updates a Tuit in the database
  * @param {string} tuitId Tuit id to update
  * @param {Tuit} tuit Tuit object 
  * @returns {any} status of the request
  */
  async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
    return await tuitModel.updateOne({_id: tuitId}, tuit)
  }
} 



