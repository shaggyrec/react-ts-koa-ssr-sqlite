import assert from 'assert';
import Koa from 'koa';
import supertest from 'supertest';
import Application from '../../src/Application';
import Sqlite from '../../src/services/Sqlite';
import settings from '../../src/settings';
import { end, load } from './fixture';

describe('Application', (): void => {
    describe('Db', (): void => {
        let db;
        beforeEach((): Sqlite => db = load());

        afterEach((): void => end());

        it('database is working ', async (): Promise<void> =>  {
            const check = await db.get('SELECT 1');
            assert.strictEqual(check['1'], 1);
        });
    });

    describe('Routes test', (): void => {
        let app;
        let server;

        beforeEach((): void => {
            app = new Application(new Koa(), load(), settings);
            server = app.run(5858);
        });

        afterEach((): void => {
            end();
            app.shutdown();
        });

        it('GET / returns the main page', async (): Promise<void> => {
            await supertest(server)
                .get('/')
                .expect(200);
        });
    });
});
