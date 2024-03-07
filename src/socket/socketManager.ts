import { Server, Socket } from 'socket.io';
import Message from '../models/message.model';
import { Types } from 'mongoose';
import messageService from '../services/message.service';

class SocketManager{
    initializeSocketIO(io: Server) {
        const roomID = '65b61d7a8db4edc72edb9362';
      
        io.on('connection', (socket: Socket) => {
          console.log(`user ${socket.currentUser.id} connected`);
      
          socket.join(roomID);
      
          socket.on('chatMessage', async (message: string) => {
            await messageService.addMessageToRoom(message, socket.currentUser.id, roomID)
            io.to(roomID).emit('chatMessage', message);
          });
      
          socket.on('disconnect', () => {
            console.log('User disconnected');
          });
        });
      }
}

export default new SocketManager() 