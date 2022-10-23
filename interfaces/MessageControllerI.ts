import { Request, Response } from "express"

export default interface MessageControllerI {
  sendMessage(req: Request, res: Response): void
  getSentMessages(req: Request, res: Response): void
  getReceivedMessages(req: Request, res: Response): void
  deleteMessage(req: Request, res: Response): void
}