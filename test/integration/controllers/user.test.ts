import { Server } from 'http';
import Koa, { Context } from 'koa';
import supertest from 'supertest';
import Application from '../../../src/Application';
import { end, load } from '../fixture';
import settings from '../../../src/settings';
import * as assert from 'assert';

describe('Me controller', (): void => {
    let app: Application;
    let server: Server;

    beforeEach((): void => {
        app = new Application(new Koa(), load(), settings);
        server = app.run(5858);
    });

    afterEach((): void => {
        end();
        app.shutdown();
    });

    it('should login user', async (): Promise<void> => {
        await supertest(server)
            .post('/api/user/login')
            .send({
                email: 'i@shagg.ru',
                password: 'testerPassword123'
            })
            .expect(200);
    });

    it('should throw 401 when couldn\'t auth', async (): Promise<void> => {
        await supertest(server)
            .post('/api/user/login')
            .send({
                email: 'i@shagg.ru',
                password: 'bad password'
            })
            .expect(401);
    });

    it('should returns 403', async (): Promise<void> => {
        await supertest(server)
            .get('/api/user/me')
            .expect(403);
    });

    it('should returns userinfo', async (): Promise<void> => {
        await supertest(server)
            .get('/api/user/me')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(200)
            .expect((ctx: Context): void => {
                assert.deepStrictEqual(
                    JSON.parse(ctx.res.text),
                    {
                        id: 1,
                        email: 'i@shagg.ru',
                        username: 'tester'
                    }
                );
            });
    });
});
