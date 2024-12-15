import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userSeed from './user.seed';
import roomSeed from './room.seed';
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(startSeed).catch(console.error);

export async function startSeed() {
  console.log('TEST');
  try {
    await userSeed();
    await roomSeed();

    console.log('all seeds has passed successfully.');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
}
