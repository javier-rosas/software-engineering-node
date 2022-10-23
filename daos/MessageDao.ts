import Message from '../models/Message'
import MessageModel from '../mongoose/MessageModel'
import MessageDaoI from '../interfaces/MessageDaoI'

export default class MessageDao implements MessageDaoI {

  private static messageDao: MessageDao | null = null;

  public static getInstance = (): MessageDao => {
      if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
      }
      return MessageDao.messageDao;
  }
  
  private constructor() {}

  async sendMessage(message: Message): Promise<Message> {
    const messageMongooseModel = await MessageModel.create(message)
    return new Message({
      _id: messageMongooseModel?._id.toString() ?? '',
      _sentBy: messageMongooseModel?._sentBy.toString() ?? '',
      _sentTo: messageMongooseModel?._sentTo.toString() ?? '',
      _timestamp: new Date(messageMongooseModel?._timestamp ?? (new Date())),
      _message: messageMongooseModel?._message.toString() ?? ''
    })
  }

  async getSentMessages(_sentBy: string): Promise<Message[]> {
    const messageMongooseModels = await MessageModel.find({_sentBy: _sentBy})
    const messages = messageMongooseModels.map((messageMongooseModel) => {
      return new Message({
        _id: messageMongooseModel?._id.toString() ?? '',
        _sentBy: messageMongooseModel?._sentBy.toString() ?? '',
        _sentTo: messageMongooseModel?._sentTo.toString() ?? '',
        _timestamp: new Date(messageMongooseModel?._sentBy ?? (new Date())),
        _message: messageMongooseModel?._message.toString() ?? ''
      })
    })
    return messages
  }

  async getReceivedMessages(_sentTo: string): Promise<Message[]> {
    const messageMongooseModels = await MessageModel.find({_sentTo: _sentTo})
    const messages = messageMongooseModels.map((messageMongooseModel) => {
      return new Message({
        _id: messageMongooseModel?._id.toString() ?? '',
        _sentBy: messageMongooseModel?._sentBy.toString() ?? '',
        _sentTo: messageMongooseModel?._sentTo.toString() ?? '',
        _timestamp: new Date(messageMongooseModel?._sentBy ?? (new Date())),
        _message: messageMongooseModel?._message.toString() ?? ''
      })
    })
    return messages
  }

  async deleteMessage(_id: string): Promise<any> {
    return await MessageModel.deleteOne({_id: _id})
  }
}