import { Context } from 'koa';
import UserService from '../services/User';

class User {

    public static me(ctx: Context): void {
        ctx.body = ctx.state.user;
    }
    private userService: UserService;

    public constructor(storage: UserService) {
        this.userService = storage;
    }

    public async login(ctx: Context): Promise<void> {
        const { email, password }: { email: string; password: string } = ctx.request.body;
        const token = await this.userService.login(email, password);
        ctx.cookies.set('auth-token', token, { expires: new Date( +new Date() + (1000 * 60 * 60 * 24 * 31 * 12 * 5)) });
        ctx.status = 200;
    }

    public async logout(ctx: Context): Promise<void> {
        ctx.cookies.set('auth-token');
        ctx.status = 200;
    }
}

export default User;
