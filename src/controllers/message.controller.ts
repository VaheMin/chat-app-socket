import { NextFunction, Request, Response } from "express";
import { HelperService } from "../services/helper.service";
import messageService from "../services/message.service";

class MessageController {
  async getMessagesByRoomID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await messageService.getMessagesByRoomID(id);
      res
        .status(200)
        .send(HelperService.formatResponse("succss", { messages: data }));
    } catch (error) {
      return next(error);
    }
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: messageID } = req.params;
      const { id: userID } = req.currentUser;
      await messageService.deleteMessageByID(userID, messageID);
      res.status(200).send(HelperService.formatResponse("success", {}));
    } catch (error) {
      return next(error);
    }
  }
}

export default new MessageController();
