import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

/**
 * Validação do token JWT
 * @param request
 * @param response
 * @param next
 */
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: TokenPayload = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;

    const { sub: id } = decoded;

    request.user = {
      id,
    };

    return next();
  } catch {
    throw new Error('Invalid Token');
  }
}
