import assert from 'assert';
import protectedRoute from '../../../src/middlewares/protectedRoute';

describe('Protected route middleware',  (): void => {
    it('should throw 403 when no user', async (): Promise<void> => {
        assert.rejects( async (): Promise<void> => {
            const ctx: any = {
                state: {}
            };
            await protectedRoute(ctx, (): Promise<void> => new Promise((): void => {}));
        }, {
            message: 'Access denied'
        });
    });

    it('should call next if user is provided', async (): Promise<void> => {
        const ctx: any = {
            state: { user: { id: 1, email: 'me@email.com', username: 'me' } }
        };
        let called = false;
        await protectedRoute(ctx, (): Promise<any> => new Promise((resolve: any): void => {
            called = true;
            resolve();
        }));
        assert(called);
    });
});
