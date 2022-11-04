/**
 * @file implements User data access object
 */
import User from "../models/User";
import userModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

 /**
  * @class UserDao Implements Data access object for user resource
  */
export default class UserDao implements UserDaoI {

  private static userDao: UserDao | null = null 

  /**
  * Creates singleton dao instance
  * @return UserDao
  */
  static getInstance = () : UserDao => {
    if (UserDao.userDao === null) {
      UserDao.userDao = new UserDao()
    }
    return UserDao.userDao
  }

  private constructor() {}
  
  /**
  * Retrieves all users that liked a tuit from the database
  * @returns list of user objects
  */
  async findAllUsers() : Promise<User[]> {
    const userMongooseModel = await userModel.find()
    const users = userMongooseModel.map( (user) => {
      return new User({
          _id: user?._id.toString() ?? '',
          _username: user?._username.toString() ?? '',
          _email: user?._email?.toString() ?? '',
          _password: user?._password?.toString() ?? ''
        }
      )
    })
    return users
  }

  /**
  * Retrieves user by id
  * @param {string} uid user id 
  * @returns single user object
  */
  async findUserById(uid: string): Promise<any> {
    const userMongooseModel = await userModel.findById(uid)
    return new User({
      _id: userMongooseModel?._id.toString() ?? '',
      _username: userMongooseModel?._username.toString() ?? '',
      _email: userMongooseModel?._email?.toString() ?? '',
      _password: userMongooseModel?._password?.toString() ?? ''
    })
  }


  /**
  * Creates a new user 
  * @param {User} user user object
  * @returns single user object
  */
  async createUser(user: User): Promise<User> {
    const userMongooseModel = await userModel.create(user)
    return new User({
      _id: userMongooseModel?._id.toString() ?? '',
      _username: userMongooseModel?._username.toString() ?? '',
      _email: userMongooseModel?._email?.toString() ?? '',
      _password: userMongooseModel?._password?.toString() ?? '',
    })
  }


  /**
  * Updates an existing user 
  * @param {string} uid user id to update
  * @param {User} user user object
  * @returns status 
  */
  async updateUser(uid: string, user: any): Promise<any> {
    return await userModel.updateOne({ _id: uid }, user)
  }


  /**
  * Deletes an existing user 
  * @param {string} uid user id to delete
  * @returns status 
  */
  async deleteUser(uid: string): Promise<any> {
    return await userModel.deleteOne({_id: uid}); 
  }

  async deleteUserbyUsername(username: string): Promise<any> {
    return await userModel.deleteOne({_username: username}); 
  }

}