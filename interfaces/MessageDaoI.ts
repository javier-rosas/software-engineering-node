import Message from "../models/Message"

export default interface MessageDaoI {
  sendMessage(_message: Message): Promise<Message>
  getSentMessages(_sentBy: string): Promise<Message[]>
  getReceivedMessages(_sentTo: string): Promise<Message[]>
  deleteMessage(_id: string, _mid: string): Promise<any>
}