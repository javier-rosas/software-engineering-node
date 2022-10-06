import User from "../models/User";
import userModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {

  private static userDao: UserDao | null = null 

  static getInstance = () : UserDao => {
    if (UserDao.userDao === null) {
      UserDao.userDao = new UserDao()
    }
    return UserDao.userDao
  }

  private constructor() {}
  
  async findAllUsers() : Promise<User[]> {
    const userMongooseModel = await userModel.find()
    const users = userMongooseModel.map( (user) => {
      return new User(
        user?.id.toString() ?? '',
        user?.username.toString() ?? '',
        user?.email.toString() ?? '',
      )
    })
    return users
  }


  async findUserById(uid: string): Promise<any> {
    const userMongooseModel = await userModel.findById(uid)
    return new User(
      userMongooseModel?._id.toString() ?? '',
      userMongooseModel?.username.toString() ?? '',
      userMongooseModel?.email.toString() ?? '',
    )
    
  }


  async createUser(user: User): Promise<User> {
    const userMongooseModel = await userModel.create(user)
    return new User(
      userMongooseModel?._id.toString() ?? '',
      userMongooseModel?.username.toString() ?? '',
      userMongooseModel?.email.toString() ?? '',
    )
  }


  async updateUser(uid: string, user: User): Promise<any> {
    return userModel.updateOne(
      {_id: uid},
      {$set: {user: user}})
  }


  async deleteUser(uid: string): Promise<any> {
    return await userModel.deleteOne({_id: uid}); 
  }

  


}