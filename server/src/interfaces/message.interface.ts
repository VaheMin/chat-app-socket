import { Types } from 'mongoose';

export interface IMessage {
  _id: string;
  message: string;
  date: Date;
  roomID: Types.ObjectId;
  senderID: Types.ObjectId;
  name: string;
}
