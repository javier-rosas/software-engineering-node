/**
 * @file Declares MessageControllerI interface
 */
import { Request, Response } from "express"

/**
 * @method sendMessage creates new Message in the message collection
 * @method getSentMessages gets all sent messages by a user 
 * @method getReceivedMessages gets all received messages by a user  
 * @method deleteMessage deletes message by id
 */
export default interface MessageControllerI {
  sendMessage(req: Request, res: Response): void
  getSentMessages(req: Request, res: Response): void
  getReceivedMessages(req: Request, res: Response): void
  deleteMessage(req: Request, res: Response): void
}