import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as Router from 'koa-router';
import * as path from 'path';

import render from '@/server/utils/render';
import * as qs from 'qs';
const app = new Koa();
const router = new Router();

app.use(serve(path.resolve(__dirname, '../../public')));

router.get('/lesson-review-h5', async (ctx, next) => {
    ctx.body = await render(ctx);
    next();
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);