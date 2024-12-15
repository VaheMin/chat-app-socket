import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../interfaces/message.interface';

const MessageSchema = new Schema<IMessage>({
  message: String,
  senderID: Schema.Types.ObjectId,
  roomID: Schema.Types.ObjectId,
  date: Date,
  name: String,
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
