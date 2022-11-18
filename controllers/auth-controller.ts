import UserDao from "../daos/user-dao"
const bcrypt = require('bcrypt')
const saltRounds = 10
import {  Express } from "express";

/**
 * Authenitcation controller implements restful api service for the auth service 
 * @param app 
 */
const AuthenticationController = (app: Express) => {

  const userDao: UserDao = UserDao.getInstace()

  /**
   * If the user exists, return status 403, otherwise, create the 
   * user witht the body of the post request data 
   * @param req 
   * @param res 
   * @returns 
   */
  const signup = async (req: any, res: any) => {
    const newUser = req.body 
    const password = newUser.password 
    const hash = await bcrypt.hash(password, saltRounds)
    newUser.password = hash 

    const existingUser = await userDao.findUserByUsername(req.body.username)
    if (existingUser) {
      res.sendStatus(403)
      return
    } else {
      const insertedUser = await userDao.createUser(newUser)
      insertedUser.password = ''
      req.session['profile'] = insertedUser 
      res.json(insertedUser)
    }
  }
  app.post("api/auth/singup", signup)
}

export default AuthenticationController