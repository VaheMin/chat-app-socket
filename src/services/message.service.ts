import { Types } from "mongoose";
import { IMessage } from "../interfaces/message.interface";
import Message from "../models/message.model";

class MessageService {
  async getMessagesByRoomID(rooomID: string): Promise<Array<IMessage>> {
    const messages = Message.find({ roomID: new Types.ObjectId(rooomID) }); // TODO select messages with paging
    return messages;
  }

  async addMessageToRoom(
    message: string,
    senderID: Types.ObjectId,
    roomID: string
  ): Promise<void> {
    const newMessage = new Message({
      message,
      senderID,
      roomID: new Types.ObjectId(roomID),
      date: new Date(),
    });
    await newMessage.save();
  }
}

export default new MessageService();
