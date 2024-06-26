import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../helper/response-error';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.issues,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      success: false,
      errors: error.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/api/')) {
    res.status(404).json({
      message: 'Not found !',
    });
  } else {
    next();
  }
};
