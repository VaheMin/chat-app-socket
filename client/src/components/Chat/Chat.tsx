import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IReduxState } from '../../types';
import { getUserData } from '../../store/slices/main/selectors';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/constants';

const useStyles = createUseStyles({
  root: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.BACKGROUND, width: '100%', height: '100vh' },
  chatView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '34px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderRadius: '12px',
  },
  chat: {
    width: '100%',
    height: '400px',
    overflowY: 'scroll',
    borderBottom: `1px solid ${colors.SECONDARY}`,
    marginBottom: '12px',
    borderTop: `1px solid ${colors.SECONDARY}`,
    scrollBehavior: 'smooth',
  },
  message: {
    fontSize: '18px',
    width: 'fit-content',
    padding: '3px 6px',
    borderRadius: '6px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 2px 2px 0px',
  },
  messageBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '12px',
    marginTop: '12px',
  },
  sender: {
    fontSize: '12px',
    fontWeight: 'bold',
  },
  sendView: {
    width: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: '8px',
  },
  button: {
    backgroundColor: colors.SECONDARY,
    color: colors.BACKGROUND,
    width: '10%',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  input: {
    border: `1px solid ${colors.THIRD}`,
    padding: '8px',
    borderRadius: '10px',
    fontSize: '16px',
    width: '90%',
  },
});

interface ChatMessage {
  id: string; // Add more fields as necessary
  message?: string;
  name: string;
}

const chatSelector = (state: IReduxState) => ({
  user: getUserData(state),
});

const ChatComponent: React.FC = () => {
  const classes = useStyles();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const { user } = useSelector(chatSelector);

  const chatRef = useRef<HTMLDivElement | null>(null); // Type the ref

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]); // Re-run when messages change

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketInstance: Socket = io('ws://localhost:3033/', {
      reconnectionDelayMax: 10000,
      extraHeaders: {
        token: `${user.token}`,
      },
    }); // Replace with your server's URL/port
    setSocket(socketInstance);

    socketInstance.emit('getMessages');

    socketInstance.on('getMessages', (messages: any) => {
      setMessages([...messages]);
    });

    // Listen for chat messages
    socketInstance.on('chatMessage', () => {});

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const isUserActive = (name: string) => name === user.name;

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit('chatMessage', newMessage, user.name); // Emit the message to the server
      socket.emit('getMessages');
      setNewMessage(''); // Clear the input field
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.chatView}>
        <h1>Conversation</h1>
        <div className={classes.chat} ref={chatRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={classes.messageBox}
              style={{
                alignItems: isUserActive(msg.name) ? 'flex-end' : 'flex-start',
              }}
            >
              <p className={classes.sender}>{msg.name}</p>
              <p
                className={classes.message}
                style={{
                  backgroundColor: isUserActive(msg.name) ? colors.MAIN : colors.BACKGROUND,
                  color: isUserActive(msg.name) ? colors.BACKGROUND : colors.SECONDARY,
                }}
              >
                {msg.message}
              </p>
            </div>
          ))}
        </div>
        <div className={classes.sendView}>
          <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Type a message' className={classes.input} />
          <button onClick={handleSendMessage} className={classes.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
