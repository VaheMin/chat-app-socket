import { Server, Socket } from 'socket.io';
import messageService from '../services/message.service';

class SocketManager {
  initializeSocketIO(io: Server) {
    const roomID = '65b61d7a8db4edc72edb9362';

    io.on('connection', (socket: Socket) => {
      console.log(`user ${socket.currentUser.id} connected`);

      socket.join(roomID);

      socket.on('getMessages', async () => {
        const messages = await messageService.getMessagesByRoomID(roomID);
        io.to(roomID).emit('getMessages', messages);
      });

      socket.on('chatMessage', async (message: string, name: string) => {
        await messageService.addMessageToRoom(message, name, socket.currentUser.id, roomID);
        io.to(roomID).emit('chatMessage', message);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
}

export default new SocketManager();
