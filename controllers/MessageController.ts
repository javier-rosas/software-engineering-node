/**
 * @file Controller RESTful Web service API for message resource
*/

import MessageControllerI from "../interfaces/MessageControllerI"
import MessageDaoI from "../interfaces/MessageDaoI"
import { Request, Response, Express } from "express"

 /**
  * @class MessageController Implements RESTful Web service API for message resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li> POST /api/messages to send a message to another user</li>
  *     <li> GET /api/users/:uid/messages/sent to get messages sent by a user </li>
  *     <li> GET /api/users/:uid/messages/received to get messages received by a user </li>
  *     <li> DELETE api/messages/:mid to delete a specific message </li>
  * </ul>
  * @property {MessageDaoI} messageDao Singleton DAO implementing message CRUD operations
  * @property {MessageController} messageController Singleton controller implementing
  * RESTful Web service API
  */
export default class MessageController implements MessageControllerI {

  private static messageController: MessageControllerI | null = null

  private static messageDao: MessageDaoI

  /**
  * Creates singleton controller instance
  * @param {Express} app Express instance to declare the RESTful Web service API
  * @return MessageController
  */
  public static getInstance = (app: Express, messageDao: MessageDaoI): MessageControllerI => {

    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController()
    }

    MessageController.messageDao = messageDao
    
    app.post('/api/messages', MessageController.messageController.sendMessage)
    app.get('/api/users/:uid/messages/sent', MessageController.messageController.getSentMessages)
    app.get('/api/users/:uid/messages/received', MessageController.messageController.getReceivedMessages)
    app.delete('/api/messages/:mid', MessageController.messageController.deleteMessage)

    return MessageController.messageController
  }

  private constructor() {}

  /**
  * Send message from one user to another
  * @param {Request} req Represents request from client, including the body which contains the message
  * @param {Response} res Represents response to client, including the
  * body formatted as a JSON containing the message object
  */
  sendMessage(req: Request, res: Response): void {
    MessageController.messageDao
      .sendMessage(req.body)
      .then(message => res.json(message))
  }

  /**
  * Retrieves sent messages by user id
  * @param {Request} req Represents request from client, including the
  * parameter uid representing the user id
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON array containing the messages
  */
  getSentMessages(req: Request, res: Response): void {
    MessageController.messageDao
      .getSentMessages(req.params.uid)
      .then(messages => res.json(messages))
  }

  /**
  * Retrieves received messages by user id
  * @param {Request} req Represents request from client, including the
  * parameter uid representing the user id
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON array containing the messages
  */
  getReceivedMessages(req: Request, res: Response): void {
    MessageController.messageDao
      .getReceivedMessages(req.params.uid)
      .then(messages => res.json(messages))
  }

  /**
  * Deletes message
  * @param {Request} req Represents request from client, including the 
  * parameter uid representing the user id and mid representing the message id
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON containing the messages
  */
  deleteMessage(req: Request, res: Response): void {
    MessageController.messageDao
      .deleteMessage(req.params.mid)
      .then(status => res.json(status))
  }

}