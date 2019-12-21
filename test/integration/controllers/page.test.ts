import assert from 'assert';
import { Server } from 'http';
import Koa from 'koa';
import { Context } from 'koa';
import supertest from 'supertest';
import Application from '../../../src/Application';
import settings from '../../../src/settings';
import { end, load } from '../fixture';

describe(('Page controller'), (): void => {
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

    it('GET / returns the main page', async (): Promise<void> => {
        await supertest(server)
            .get('/')
            .expect(200)
            .expect((ctx: Context): void => {
                assert.notStrictEqual(ctx.res.text.indexOf('<h1') , -1);
            });
    });

    it('GET /{:alias} returns the page', async (): Promise<void> => {
        await supertest(server)
            .get('/first')
            .expect(200);
    });

    it('GET /{:alias} returns 404 when page not found', async (): Promise<void> => {
        await supertest(server)
            .get('/non-existing-page')
            .expect(404);
    });

    it('/api/pages/{:id} returns page as PageSchema', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages/first')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(200)
            .expect(
                (ctx: Context): void => {
                    assert.strictEqual(ctx.body.id, 1);
                }
            );
    });

    it('/api/pages/{:id} returns 404 when page not found', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages/non-existing-page')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(404);
    });

    it('should update page', async (): Promise<void> => {
        await supertest(server)
            .put('/api/pages/1')
            .send({ title: 'test', excludeFromBlog: true })
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(200);
    });

    it('should throw error when data is invalid', async (): Promise<void> => {
        await supertest(server)
            .put('/api/pages/1')
            .send({ bad: 'field' })
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(400);
    });

    it('should create page', async (): Promise<void> => {
        await supertest(server)
            .post('/api/pages')
            .send({ title: 'test', alias: 'alias' })
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(200);
    });

    it('should alias is required when create page', async (): Promise<void> => {
        await supertest(server)
            .post('/api/pages')
            .send({ title: 'test' })
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(400);
    });

    it('should fail when alias already exists(create)', async (): Promise<void> => {
        await supertest(server)
            .post('/api/pages')
            .send({ title: 'test', alias: 'first' })
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(400);
    });

    it('should fail when alias already exists(update)', async (): Promise<void> => {
        await supertest(server)
            .put('/api/pages/2')
            .send({ title: 'test', alias: 'first' })
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', ['auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpQHNoYWdnLnJ1IiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1NzY5MTc3NzMsImV4cCI6MTYwOTA1ODU3M30.7oiyJjJS082lbMQ5B5xUS1UMBqnX-93jFvMvuRHYtSM'])
            .expect(400);
    });

    it('GET /api/pages/{id} returns the page', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages/id/1')
            .expect(200);
    });

    it('should return list of articles', async (): Promise<void> => {
        await supertest(server)
            .get('/blog')
            .expect(200);

        await supertest(server)
            .get('/api/pages')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(200);
    });

    it('should consider limit and offset when get list of pages', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages?limit=1&offset=1')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(200)
            .expect(
                (ctx: Context): void => {
                    assert.strictEqual(ctx.body.length, 1);
                    assert.strictEqual(ctx.body[0].id, 2);
                }
            );
    });

    it('should throw bad request when bad params', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages?limit=asd')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(400);
    });

    it('should get next page after current page', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages/next/2')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(200);
    });

    it('should get count of pages', async (): Promise<void> => {
        await supertest(server)
            .get('/api/pages/count')
            .set('X-Requested-With', 'XMLHttpRequest')
            .expect(200)
            .expect(
                (ctx: Context): void => {
                    assert.strictEqual(ctx.body, 3);
                }
            );
    });
});
