import { Request, Response } from 'express';
import createUser from './services/CreateUser.service';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Matheus',
    email: 'matheus.grigoletto@me.com',
    password: '123456',
    techs: [
      'Swift',
      'React',
      'Angular',
      {
        title: 'PHP',
        experience: 100,
      },
    ]
  });

  return response.json({
    message: 'Hello TypeScript',
    user,
  });
}
