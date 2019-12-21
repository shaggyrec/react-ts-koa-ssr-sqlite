import Context from 'koa';
import { IMiddleware } from 'koa-router';
import Forbidden from '../errors/Forbidden';

export default async (ctx: Context, next: () => Promise<any>): IMiddleware => {
    if (ctx.state.user) {
        await next();
    } else {
        throw new Forbidden('Access denied');
    }
};
