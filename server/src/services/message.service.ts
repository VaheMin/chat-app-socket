import { Types } from 'mongoose';
import { IMessage } from '../interfaces/message.interface';
import Message from '../models/message.model';
import User from '../models/user.model';
import Room from '../models/room.model';
import { IRoom } from '../interfaces/room.interface';

class MessageService {
  async getMessagesByRoomID(rooomID: string): Promise<Array<IMessage>> {
    const messages = Message.find({ roomID: new Types.ObjectId(rooomID) }); // TODO select messages with paging
    return messages;
  }

  async addMessageToRoom(message: string, name: string, senderID: Types.ObjectId, roomID: string): Promise<void> {
    const newMessage = new Message({
      message,
      senderID,
      name,
      roomID: new Types.ObjectId(roomID),
      date: new Date(),
    });
    await newMessage.save();
  }

  async deleteMessageByID(userID: Types.ObjectId, messageID: string): Promise<void> {
    const message = await Message.findById(messageID);
    if (!message) {
      throw new Error('Message not found');
    }

    if (!message.senderID.equals(userID)) {
      throw new Error('You are not authorized to delete this message');
    }

    await Message.findByIdAndDelete(messageID);
  }

  async createNewRoom(roomName: string): Promise<IRoom | null> {
    const room = await Room.findOne({ name: roomName });
    if (room) {
      throw new Error(`Room with ${roomName} name already exists`);
    }
    try {
      const newRoom = new Room({ name: roomName });
      newRoom.save();
      console.log(`Room with ${roomName} name successfully created`);
      return newRoom;
    } catch {
      console.log(`Something went wrong`);
      return null;
    }
  }
}

export default new MessageService();
