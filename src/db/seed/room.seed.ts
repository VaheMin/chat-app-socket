import { Types } from "mongoose";
import Room from "../../models/room.model";


export default async function roomSeed() {
  const rooms = [
    { _id: new Types.ObjectId('65b61d7a8db4edc72edb9362'), name: "main room" },
  ];

  await Room.deleteMany({});
  await Room.insertMany(rooms)

  console.log("Rooms has seeded successfully.");
}
