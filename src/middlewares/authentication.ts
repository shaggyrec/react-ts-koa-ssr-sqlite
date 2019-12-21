import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import Authentication from '../services/Authentication';

export function authentication(authenticator: Authentication): IMiddleware {
    return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
        const token = ctx.cookies.get('auth-token');
        const user = await authenticator.tryToAuth(token);
        ctx.state.user = user;
        ctx.state.react.user.current = user;
        await next();
    };
}
