import koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import router from 'routes';
import mongoose from 'mongoose';
import logger from 'logger';

mongoose.connect('mongodb://localhost/notes');
const db = mongoose.connection;
const app = koa();
db.on('error', (err) => app.emit('error', err));
db.once('open', () => {
  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes());
});

app.on('error', logger.error.bind(logger));
