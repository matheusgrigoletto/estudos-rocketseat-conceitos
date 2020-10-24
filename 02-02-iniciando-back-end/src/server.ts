import 'reflect-metadata';
import express, { Express } from 'express';
import router from './routes';

import './database';

const app: Express = express();

app.use(router);

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333');
});
