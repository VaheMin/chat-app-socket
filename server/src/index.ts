import app from './app';
import dotenv from 'dotenv';
import { connect as mongoConnect } from './db/mongo';
import { socketAuth } from './middlewares/auth.middleware';
import socketManager from './socket/socketManager';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 3001;
const corsOptions = {
  origin: ['http://localhost:3002', 'http://your-production-domain.com'], // Replace with your front-end URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies if needed
};
app.express.use(cors(corsOptions));

app.httpServer.on('listening', () => {
  console.log(`server is listening on ${port}`);
});

app.httpServer.listen(port);

mongoConnect();

app.io.use(socketAuth);
socketManager.initializeSocketIO(app.io);

app.httpServer.on('error', (error: any) => {
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
});

export default app.express;
