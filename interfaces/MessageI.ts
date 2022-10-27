/**
 * @file Declares MessageI interface
 */

/**
 * @property _id specifc Message id
 * @property _userID1 user with smallest object id
 * @property _userID2 user with largest object id
 * @property _sentBy user who sends the message 
 * @property _sentTo user who receives the message
 * @property _message actual message text, image, etc. 
 * @property _timestamp date message was sent
 */

export default interface MessageI {
  _id: string,
  _userID1?: string,
  _userID2?: string
  _sentBy: string,
  _sentTo: string,
  _message: string,
  _timestamp: Date
}