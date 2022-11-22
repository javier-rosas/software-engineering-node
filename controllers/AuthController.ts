import UserDao from "../daos/UserDao"
const bcrypt = require('bcrypt')
const saltRounds = 10
import {  Express } from "express";

/**
 * Authenitcation controller implements restful api service for the auth service 
 * @param app 
 */
const AuthenticationController = (app: Express) => {
 
  const userDao: UserDao = UserDao.getInstance()

  /**
   * If the user exists, return status 403, otherwise, create the 
   * user witht the body of the post request data 
   * @param req 
   * @param res 
   * @returns 
   */
  const signup = async (req: any, res: any) => {
    const newUser = req.body 
    const password = newUser._password
    const hash = await bcrypt.hash(password, saltRounds)
    newUser._password = hash 
    const existingUser = await userDao.findUserByUsername(req.body._username)
    if (!(Array.isArray(existingUser) && existingUser.length===0)) {
      res.sendStatus(403)
      return
    } else {
      const insertedUser = await userDao.createUser(newUser)
      insertedUser.password = ''
      req.session['profile'] = insertedUser 
      res.json(insertedUser)
    }
  }

  /**
   * Get profile data from session
   * @param req 
   * @param res 
   */
  const profile = (req: any, res: any) => {
    const profile = req.session['profile'];
    if (profile) {
      profile._password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }
  
  /**
   * User logout.  
   * @param req 
   * @param res 
   */
  const logout = (req: any, res: any) => {
     req.session.destroy();
     res.sendStatus(200);
  }

  /**
   * User logs in. If the user exists, we will compare the hashes. If there
   * is a match, set the session profile to the user and send it back as json. 
   * @param req 
   * @param res 
   * @returns 
   */
  const login = async (req: any, res: any) => {
    const user = req.body;
    const username = user._username;
    const password = user._password;
    let existingUser = await userDao
      .findUserByUsername(username);
  
    existingUser = existingUser[0]
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }
  
    const match = await bcrypt.compare(password, existingUser._password);
    const hashesMatch = password === existingUser._password
    if (match || hashesMatch) {
      existingUser._password = '*****';
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };
  
  // api routes
  app.post("/api/auth/login", login);
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);
  app.post("/api/auth/signup", signup)
}

export default AuthenticationController