/**
 * @file Declares MessageDaoI interface
 */
import Message from "../models/Message"

/**
 * @method sendMessage creates new Message in the message collection
 * @method getSentMessages gets all sent messages by a user 
 * @method getReceivedMessages gets all received messages by a user  
 * @method deleteMessage deletes message by id
 */
export default interface MessageDaoI {
  sendMessage(_message: Message): Promise<Message>
  getSentMessages(_sentBy: string): Promise<Message[]>
  getReceivedMessages(_sentTo: string): Promise<Message[]>
  deleteMessage(_mid: string): Promise<any>
}