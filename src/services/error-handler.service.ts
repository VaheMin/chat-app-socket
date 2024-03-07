import { Request, Response, NextFunction } from 'express';
import { HelperService } from './helper.service';

class ErrorHandler {
  notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).send(HelperService.formatResponse("failed", { error: 'Not found', type: 'NotFound' }));
  }

  internalServerError(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('error message', err.message);
    console.error('error status', err.status);

    if (err.status === 500) {
      return res.status(err.status).send('something went wrong');
    }

    return res.status(400).send(
      HelperService.formatResponse('failed', {
        error: err.message,
      }),
    );
  }
}

export default new ErrorHandler();
