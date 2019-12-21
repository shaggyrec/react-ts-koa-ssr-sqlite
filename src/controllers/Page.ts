import { Context } from 'koa';
import BadRequest from '../errors/BadRequest';
import PageStorage from '../storage/PageStorage';

interface QueryParams {
    limit?: string;
    offset?: string;
    page?: string;
}

class Page {
    private storage: PageStorage;
    private perPage: number = 20;

    public constructor(storage: PageStorage) {
        this.storage = storage;
    }

    public async main(ctx: Context, next: () => any): Promise<void> {
        const mainPage = await this.storage.byAlias('_', !ctx.state.user);
        ctx.state.react.application.meta = mainPage ? {
            title: mainPage.title,
            description: mainPage.description
        } : {};
        ctx.state.react.pages.current = mainPage || null;
        ctx.state.react.pages.list = await this.storage.list(5, 0, !ctx.state.user);

        return await next();
    }

    public async page(ctx: Context, next: () => any): Promise<void> {
        const page = await this.storage.byAlias(ctx.params.alias, !ctx.state.user);

        if (ctx.state.xhr) {
            if (page) {
                ctx.body = page;
            } else {
                ctx.status = 404;
            }
            return;
        }

        ctx.state.react.application.meta = page ? {
            title: page.title,
            description: page.description
        } : {};
        ctx.state.react.pages.current = page || null;

        return await next();
    }

    public async pageById(ctx: Context): Promise<void> {
        const page = await this.storage.byId(ctx.params.id);
        if (page) {
            ctx.body = page;
        } else {
            ctx.status = 404;
        }
    }

    public async next(ctx: Context): Promise<void> {
        const nextPage = await this.storage.next(ctx.params.id);
        if (nextPage) {
            ctx.body = nextPage;
        } else {
            ctx.status = 404;
        }
    }

    public async list(ctx: Context, next: () => any): Promise<void> {
        Page.assertQueryParametersAreValid(ctx.query);
        let limit = ctx.query.limit || this.perPage;
        let offset = ctx.query.offset || 0;
        const pageNumber = parseInt(ctx.params.page || ctx.query.page);
        if (pageNumber) {
            if (pageNumber < 2) {
                return ctx.redirect(ctx.request.path.replace('/1', ''));
            }
            limit = this.perPage;
            offset = (pageNumber - 1) * limit;
        }
        const pageList = await this.storage.list(limit, offset, !ctx.state.user);
        if (!ctx.state.xhr) {
            const page = await this.storage.byAlias('blog');
            ctx.state.react.application.meta = page ? {
                title: page.title,
                description: page.description
            } : {};
            ctx.state.react.pages.list = pageList;
            return await next();
        }
        ctx.body = pageList;
    }

    public async count(ctx: Context): Promise<void> {
        ctx.body = await this.storage.count();
    }

    public async update(ctx: Context): Promise<void> {
        Page.assertFieldsToWrite(ctx.request.body);
        try {
            await this.storage.update(ctx.params.id, ctx.request.body);
            ctx.status = 200;
        } catch (e) {
            if (e.message.indexOf('UNIQUE constraint failed: page.alias') !== -1) {
                throw new BadRequest('Field alias should be unique');
            }
            throw e;
        }
    }

    public async create(ctx: Context): Promise<void> {
        Page.assertFieldsToWrite(ctx.request.body);
        if (!ctx.request.body.alias) {
            throw new BadRequest('Field alias is required');
        }
        try {
            await this.storage.create({ ...ctx.request.body, userId: ctx.state.user.id });
        } catch (e) {
            if (e.message.indexOf('UNIQUE constraint failed: page.alias') !== -1) {
                throw new BadRequest('Field alias should be unique');
            }
            throw e;
        }
        ctx.status = 200;
    }

    private static assertFieldsToWrite(fields: object): void {

        if (Object.keys(fields).length === 0) {
            throw new BadRequest('Writing data is empty');
        }

        Object.keys(fields).map((field: string): void => {
            if (PageStorage.dbFieldsToWrite.indexOf(field) === -1) {
                throw new BadRequest(`Field ${field} is unavailable for writing`);
            }
        });
    }

    private static assertQueryParametersAreValid(queryParams: QueryParams): void {
        // tslint:disable-next-line:radix
        if (queryParams.limit && isNaN(parseInt(queryParams.limit))) {
            throw new BadRequest('Param limit must be an integer');
        }

        // tslint:disable-next-line:radix
        if (queryParams.offset && isNaN(parseInt(queryParams.limit))) {
            throw new BadRequest('Param offset must be an integer');
        }

        if (queryParams.page && isNaN(parseInt(queryParams.page))) {
            throw new BadRequest('Param page must be an integer');
        }
    }
}

export default Page;
