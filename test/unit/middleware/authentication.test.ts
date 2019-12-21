import assert from 'assert';
import sinon from 'sinon';
import { authentication } from '../../../src/middlewares/authentication';
import { initialState } from '../../../src/react/ducks';

describe('authentication', (): void => {
    const sandbox = sinon.createSandbox();

    afterEach((): void => {
        sandbox.restore();
    });

    it('Should set context with the user data', async (): Promise<void> => {
        const ctx: any = {
            state: {
                react: initialState
            },
            cookies: {
                get: (name: string): string => name
            }
        };

        const fakeAuthenticator: any = {
            tryToAuth: sandbox.stub().returns({
                id: 1,
                email: 'me@mail.com',
                username: 'me'
            })
        };

        const spy = sandbox.spy();
        const authenticationMiddleware = authentication(fakeAuthenticator);

        await authenticationMiddleware(ctx, spy);

        assert(fakeAuthenticator.tryToAuth.calledOnce);
        assert.deepStrictEqual(ctx.state.user, {
            id: 1,
            email: 'me@mail.com',
            username: 'me'
        });
        assert(spy.calledOnce);
    });
});
