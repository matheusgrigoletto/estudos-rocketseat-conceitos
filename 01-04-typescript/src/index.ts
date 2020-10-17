import express, { Express } from 'express';
import { helloWorld } from './routes';

const app: Express = express();

app.get('/', helloWorld);

app.listen(3333);
