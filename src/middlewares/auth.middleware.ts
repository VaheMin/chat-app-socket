import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';

interface UserPayload {
  id: Types.ObjectId;
  fullName: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

declare module 'socket.io' {
    interface Socket {
      currentUser?: UserPayload; 
    }
  }

const auth = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('UnAuthorised'); // Todo create more robust error types
  if (!req.headers.authorization) {
    return next(error);
  }

  try {
    const splitedToken = String(req.headers.authorization).split(' ');
    if (splitedToken.length !== 2 && splitedToken[0] !== 'Bearer') {
      return next(error);
    }
    const payload = jwt.verify(splitedToken[1], process.env.JWT_SECRET) as UserPayload;
    req.currentUser = payload;
    return next();
  } catch (err) {
    console.error('err in auth', err);
    const error = new Error('UnAuthorised');;
    return next(error);
  }
};

const socketAuth = (socket: Socket, next: NextFunction) => {
    const token = socket.handshake.headers.token;
    const error = new Error('UnAuthorised'); 
    if (!token) {
      return next(error);
    }
  
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
      socket.currentUser = payload;
      return next();
    } catch (err) {
      console.error('err in socket auth', err);
      const error = new Error('UnAuthorised');;
      return next(error);
    }
  };

export {auth, socketAuth};
