import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatched = await compare(password, String(user.password));

    if (!passwordMatched) {
      throw new Error('Invalid credentials');
    }

    const payload = {};

    const secret =
      '5C819645D7B6DDA56FDC17564B4E6AA31B8A68548DF739C5DFA8D038A4DFF665';

    const token = sign(payload, secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
