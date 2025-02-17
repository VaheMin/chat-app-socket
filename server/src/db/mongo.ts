import mongoose, { Connection } from 'mongoose';
import { startSeed } from './seed';

function connect() {
  mongoose.connect(process.env.MONGO_URL);

  const db: Connection = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected successfully');
  });
}

export { connect };
