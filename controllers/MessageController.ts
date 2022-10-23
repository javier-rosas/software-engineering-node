import MessageControllerI from "../interfaces/MessageControllerI"
import MessageDaoI from "../interfaces/MessageDaoI"
import { Request, Response, Express } from "express"

export default class MessageController implements MessageControllerI {

  private static messageController: MessageControllerI | null = null

  private static messageDao: MessageDaoI

  public static getInstance = (app: Express, messageDao: MessageDaoI): MessageControllerI => {

    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController()
    }

    MessageController.messageDao = messageDao
    
    app.post('/api/messages', MessageController.messageController.sendMessage)
    app.get('/api/users/:uid/messages/sent', MessageController.messageController.getSentMessages)
    app.get('/api/users/:uid/messages/received', MessageController.messageController.getReceivedMessages)
    app.delete('/api/users/:uid/messages/:mid', MessageController.messageController.deleteMessage)

    return MessageController.messageController
  }

  private constructor() {}

  sendMessage(req: Request, res: Response): void {
    MessageController.messageDao
      .sendMessage(req.body)
      .then(message => res.json(message))
  }

  getSentMessages(req: Request, res: Response): void {
    MessageController.messageDao
      .getSentMessages(req.params.uid)
      .then(messages => res.json(messages))
  }

  getReceivedMessages(req: Request, res: Response): void {
    MessageController.messageDao
      .getReceivedMessages(req.params.uid)
      .then(messages => res.json(messages))
  }

  deleteMessage(req: Request, res: Response): void {
    MessageController.messageDao
      .deleteMessage(req.params.uid, req.params.mid)
      .then(status => res.json(status))
  }

}