import { Request, Response, NextFunction } from 'express';
import { Namespace } from 'socket.io';
import { respStatus } from '../enums/response.enum';
import authService from '../services/auth.service';
import { HelperService } from '../services/helper.service';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password } = req.body;
      const data = await authService.auth(name, password);
      res.status(200).send(HelperService.formatResponse(respStatus.SUCCESS, { token: data, name: name }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new AuthController();
