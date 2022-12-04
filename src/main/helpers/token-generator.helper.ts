import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { JWT_SECRET } from '../config';

type TokenPayload = {
  id: string
  email: string
  role: string
}

export class TokenGenerator {
  static sign(payload: string | Object | Buffer | TokenPayload): string {
    return sign(payload, JWT_SECRET, { expiresIn: '15m' })
  }

  static generateRefreshToken(): string {
    return v4()
  }
}