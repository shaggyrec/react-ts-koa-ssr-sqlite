import { createMemoryHistory } from 'history';
import { Server } from 'http';
import { Context } from 'koa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import isAjax from 'koa-isajax';
import Router from 'koa-router';
import serve from 'koa-static';
import Page from './controllers/Page';
import User from './controllers/User';
import Settings from './dataTypes/Settings';
import { authentication } from './middlewares/authentication';
import errorHandler from './middlewares/errorHandler';
import protectedRoute from './middlewares/protectedRoute';
import { initialState } from './react/ducks';
import { Server as React } from './react/ReactApp';
import Authentication from './services/Authentication';
import Hasher from './services/Hasher';
import Sqlite from './services/Sqlite';
import UserService from './services/User';
import PageStorage from './storage/PageStorage';
import UserStorage from './storage/UserStorage';

export default class Application {
    private auth: Authentication;
    private userStorage: UserStorage;
    private app: Koa;
    private router: Router;
    private readonly db: Sqlite;
    private server: Server;
    private page: Page;
    private user: User;
    private settings: Settings;

    public constructor(app: Koa, db: Sqlite, settings: Settings) {
        this.app = app;
        this.settings = settings;
        this.router = new Router();
        this.db = db;
        this.registerServices();
        this.setUpRoutes();
    }

    public run(port: number): Server {
        this.applyMiddlewares();
        // eslint-disable-next-line no-console
        return this.server = this.app.listen(port, (): void => console.log(`Application run on the ${port} port`));
    }

    public shutdown(): void {
        this.server.close();
    }

    private registerServices(): void {
        this.page = new Page(new PageStorage(this.db));
        this.userStorage = new UserStorage(this.db);
        this.auth = new Authentication(this.settings.jwtSecret, this.userStorage);
        this.user = new User(new UserService(this.userStorage, new Hasher(), this.auth));
    }

    private applyMiddlewares(): void {
        this.app.use(serve(__dirname + '/../public'));
        this.app.use(isAjax());
        this.app.use(errorHandler);
        this.app.use(Application.createReactState);
        this.app.use(bodyParser());
        this.app.use(authentication(this.auth));
        this.app.use(this.router.routes());
    }

    private setUpRoutes(): void {
        this.router.get('/', (ctx: Context, next: () => Promise<any>): Promise<void> => this.page.main(ctx, next));
        this.router.get('/blog/:page(\\d+)?', (ctx: Context, next: () => Promise<any>): Promise<void> => this.page.list(ctx, next));
        this.router.get(
            '/:alias',
            (ctx: Context, next: () => Promise<any>): Promise<void> => this.page.page(ctx, next)
        );
        this.setUpApiRoutes();
        this.router.get('*', this.configureReact);
    }

    private setUpApiRoutes(): void {
        const api = new Router();
        api.get('/pages/count', (ctx: Context): Promise<void> => this.page.count(ctx));
        api.get('/pages/:alias', (ctx: Context, next: () => Promise<any>): Promise<void> => this.page.page(ctx, next));
        api.get('/pages/id/:id', (ctx: Context): Promise<void> => this.page.pageById(ctx));
        api.get('/pages/next/:id', (ctx: Context): Promise<void> => this.page.next(ctx));
        api.get('/pages', (ctx: Context, next: () => Promise<any>): Promise<void> => this.page.list(ctx, next));
        api.put('/pages/:id', protectedRoute, (ctx: Context): Promise<void> => this.page.update(ctx));
        api.post('/pages', protectedRoute, (ctx: Context): Promise<void> => this.page.create(ctx));
        api.post('/user/login', (ctx: Context): Promise<void> => this.user.login(ctx));
        api.post('/user/logout', (ctx: Context): Promise<void> => this.user.logout(ctx));
        api.get('/user/me', protectedRoute, User.me);
        this.router.use('/api', api.routes(), api.allowedMethods());
    }

    private async configureReact(ctx: Context): Promise<void> {
        const history = createMemoryHistory({
            initialEntries: [ctx.req.url]
        });
        const context: { status: number; url?: string } = { status: 200 };
        const reactApp = (
            new React(history, ctx.state.react, ctx.req.url, context, ctx.state.react.application.meta)
        ).render();
        ctx.status = context.status;
        if ((context.status === 302 || context.status === 301) && context.url) {
            ctx.redirect(context.url);
        }
        ctx.body = await '<!DOCTYPE html>' + reactApp;
    }

    private static async createReactState(ctx: Context, next: () => any): Promise<void> {
        ctx.state.meta = {};
        ctx.state.react = initialState;
        await next();
    }
}
