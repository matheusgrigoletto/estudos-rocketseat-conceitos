import express, { Express } from 'express';
import router from './routes';

const app: Express = express();

app.use(router);

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333');
});