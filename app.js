import koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';

const app = koa();
app
  .use(cors())
  .use(bodyParser());
