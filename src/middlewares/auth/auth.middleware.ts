import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('i am the auth middleware')
    const token = req.headers['auth-user'];
    if (!token) {
      return res.status(401).json({ message: 'Authorization header not found' });
    }
    try {
      const decoded = jwt.verify(token.toString(), 'mysecret');
      req.body.userId = decoded['userId']
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
  }
}
