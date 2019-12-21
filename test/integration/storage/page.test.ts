import assert from 'assert';
import PageStorage from '../../../src/storage/PageStorage';
import { end, load } from '../fixture';

describe('Page storage', (): void => {
    let page;
    beforeEach((): void => {
        const db = load();
        page = new PageStorage(db);
    });
    afterEach((): void => end());

    it('should return list of pages', async (): Promise<void> => {
        const list = await page.list(1);
        assert.strictEqual(list.length, 1);
    });

    it('should return one page by alias', async (): Promise<void> => {
        const onePage = await page.byAlias('first');
        assert.strictEqual(onePage.id, 1);
    });

    it('should update page by id', async (): Promise<void> => {
        await page.update(1, { alias: 'updated-alias' });
        const updatedPage = await page.byAlias('updated-alias');
        assert.strictEqual(updatedPage.id, 1);
    });
    it('should create page', async (): Promise<void> => {
        await page.create({ alias: 'new-page-alias', userId: 1 });
        const newPage = await page.byAlias('new-page-alias', false);
        assert.strictEqual(newPage.alias, 'new-page-alias');
    });

    it('should get page by id', async (): Promise<void> => {
        const p = await page.byId(1);
        assert.strictEqual(p.alias, 'first');
    });

    it('should get next page', async (): Promise<void> => {
        const p = await page.next(2);
        assert.strictEqual(p.alias, 'first');
    });

    it('should return count of pages', async (): Promise<void> => {
        const count = await page.count();
        assert.strictEqual(count, 3);
    });
});
