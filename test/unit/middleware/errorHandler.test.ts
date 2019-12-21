import assert from 'assert';
import { Context } from 'koa';
import { mock } from 'sinon';
import BadRequest from '../../../src/errors/BadRequest';
import Forbidden from '../../../src/errors/Forbidden';
import NotFound from '../../../src/errors/NotFound';
import Unauthorized from '../../../src/errors/Unauthorized';
import errorHandler from '../../../src/middlewares/errorHandler';

describe('Error Handler',  (): void => {
    const ctx = mock(Context);

    it('should return 500', async (): Promise<void> => {
        const next = (): Promise<void> => new Promise((): void => {
            throw new Error('Error');
        });
        await errorHandler(ctx, next);
        assert.deepStrictEqual(ctx.status, 500);
    });

    it('should return 401', async (): Promise<void> => {
        const next = (): Promise<void> => new Promise((): void => {
            throw new Unauthorized('Message');
        });
        await errorHandler(ctx, next);
        assert.deepStrictEqual(ctx.status, 401);
        assert.deepStrictEqual(ctx.body, 'Message');
    });

    it('should return 404', async (): Promise<void> => {
        const next = (): Promise<void> => new Promise((): void => {
            throw new NotFound('Message');
        });
        await errorHandler(ctx, next);
        assert.deepStrictEqual(ctx.status, 404);
        assert.deepStrictEqual(ctx.body, 'Message');
    });

    it('should return 400', async (): Promise<void> => {
        const next = (): Promise<void> => new Promise((): void => {
            throw new BadRequest('Message');
        });
        await errorHandler(ctx, next);
        assert.deepStrictEqual(ctx.status, 400);
        assert.deepStrictEqual(ctx.body, 'Message');
    });

    it('should return 403', async (): Promise<void> => {
        const next = (): Promise<void> => new Promise((): void => {
            throw new Forbidden('Message');
        });
        await errorHandler(ctx, next);
        assert.deepStrictEqual(ctx.status, 403);
        assert.deepStrictEqual(ctx.body, 'Message');
    });
});
