import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export class GenerateToken {
  static sign(payload: string | Object | Buffer): string {
    return sign(payload, JWT_SECRET, { expiresIn: '15m' })
  }
}