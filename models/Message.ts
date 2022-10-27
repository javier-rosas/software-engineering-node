/**
 * @file Declares Message class
 */

import MessageI from '../interfaces/MessageI'

/**
 * @class Message encloses Message data and functionality 
 * @property {string} _id 
 * @property {string} _userID1 userID1 is the smallest ObjectID of the two 
 * @property {string} _userID2 userID2 is the largest ObjectID of the two 
 * @property {string} _sentBy 
 * @property {string} _sentTo 
 * @property {string} _timestamp 
 * @property {string} _message actual message data
 */
export default class Message {

  private _id: string 
  private _userID1?: string 
  private _userID2?: string
  private _sentBy: string
  private _sentTo: string
  private _timestamp: Date
  private _message: string
  
  constructor({
		_id,
    _userID1,
    _userID2,
    _sentBy,
    _sentTo,
    _timestamp,
    _message
	} : MessageI) {
		this._id = _id
    this._userID1 = _userID1
    this._userID2 = _userID2
    this._sentBy = _sentBy
    this._sentTo = _sentTo
    this._timestamp = _timestamp
    this._message = _message
	}

  // id
  public get id(): string {
    return this._id
  }
  public set id(value: string) {
    this._id = value
  }

  // userID 1
  public get userID1(): string | undefined {
    return this._userID1
  }
  public set userID1(value: string | undefined) {
    this._userID1 = value
  }

  // userID 2
  public get userID2(): string | undefined{
    return this._userID2
  }
  public set userID2(value: string | undefined) {
    this._userID2 = value
  }

  // sentBy
  public get sentBy(): string {
    return this._sentBy
  }
  public set sentBy(value: string) {
    this._sentBy = value
  }

  // sentTo
  public get sentTo(): string {
    return this._sentTo
  }
  public set sentTo(value: string) {
    this._sentTo = value
  }

  // timestamp
  public get timestamp(): Date {
    return this._timestamp
  }
  public set timestamp(value: Date) {
    this._timestamp = value
  }

  // message
  public get message(): string {
    return this._message
  }
  public set message(value: string) {
    this._message = value
  }

}