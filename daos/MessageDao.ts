/**
 * @file implements Message data access object
*/

import Message from '../models/Message'
import MessageModel from '../mongoose/MessageModel'
import MessageDaoI from '../interfaces/MessageDaoI'

/**
* @class MessageDao implements Data access object for message resource
*/
export default class MessageDao implements MessageDaoI {

  private static messageDao: MessageDao | null = null;

  /**
  * Creates singleton dao instance
  * @return MessageDao
  */
  public static getInstance = (): MessageDao => {
      if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
      }
      return MessageDao.messageDao;
  }
  
  private constructor() {}

  /**
  * Send a message to another user
  * @param {Message} message message object
  * @returns {Message} message object
  */
  async sendMessage(message: Message): Promise<Message> {
    const messageMongooseModel = await MessageModel.create(message)
    return new Message({
      _id: messageMongooseModel?._id.toString() ?? '',
      _sentBy: messageMongooseModel?._sentBy.toString() ?? '',
      _sentTo: messageMongooseModel?._sentTo.toString() ?? '',
      _timestamp: new Date(messageMongooseModel?._timestamp ?? (new Date())),
      _message: messageMongooseModel?._message?.toString() ?? ''
    })
  }

  /**
  * Get all messages sent by a user
  * @param {string} _sentBy user ID 
  * @returns {Message} list of message objects sent by user
  */
  async getSentMessages(_sentBy: string): Promise<Message[]> {
    const messageMongooseModels = await MessageModel.find({_sentBy: _sentBy})
    const messages = messageMongooseModels.map((messageMongooseModel) => {
      return new Message({
        _id: messageMongooseModel?._id.toString() ?? '',
        _sentBy: messageMongooseModel?._sentBy.toString() ?? '',
        _sentTo: messageMongooseModel?._sentTo.toString() ?? '',
        _timestamp: new Date(messageMongooseModel?._timestamp ?? (new Date())),
        _message: messageMongooseModel?._message?.toString() ?? ''
      })
    })
    return messages
  }

  /**
  * Get all messages received by a user
  * @param {string} _sentTo user ID 
  * @returns {Message} list of message objects received by user
  */
  async getReceivedMessages(_sentTo: string): Promise<Message[]> {
    const messageMongooseModels = await MessageModel.find({_sentTo: _sentTo})
    const messages = messageMongooseModels.map((messageMongooseModel) => {
      return new Message({
        _id: messageMongooseModel?._id.toString() ?? '',
        _sentBy: messageMongooseModel?._sentBy.toString() ?? '',
        _sentTo: messageMongooseModel?._sentTo.toString() ?? '',
        _timestamp: new Date(messageMongooseModel?._timestamp ?? (new Date())),
        _message: messageMongooseModel?._message?.toString() ?? ''
      })
    })
    return messages
  }

  /**
  * Delete message from the database
  * @param {string} _id message ID 
  * @returns {any} status
  */
  async deleteMessage(_id: string): Promise<any> {
    return await MessageModel.deleteOne({_id: _id})
  }
}