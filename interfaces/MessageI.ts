export default interface MessageI {
  _id: string,
  _userID1?: string,
  _userID2?: string
  _sentBy: string,
  _sentTo: string,
  _message: string,
  _timestamp: Date
}