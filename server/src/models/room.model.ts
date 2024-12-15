import mongoose, { Schema } from "mongoose";
import { IRoom } from "../interfaces/room.interface";

const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      minLength: 2,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", RoomSchema);

export default Room;
