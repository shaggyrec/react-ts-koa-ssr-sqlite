import Context from 'koa';
import { IMiddleware } from 'koa-router';
import BadRequest from '../errors/BadRequest';
import Forbidden from '../errors/Forbidden';
import NotFound from '../errors/NotFound';
import Unauthorized from '../errors/Unauthorized';

export default async (ctx: Context, next: () => Promise<any>): IMiddleware => {
    try {
        await next();
    } catch (e) {
        ctx.status = 500;
        if (e instanceof Unauthorized) {
            ctx.status = 401;
        } else if (e instanceof NotFound) {
            ctx.status = 404;
        } else if (e instanceof BadRequest) {
            ctx.status = 400;
        } else if (e instanceof Forbidden) {
            ctx.status = 403;
        }
        ctx.body = e.message;
    }
};
