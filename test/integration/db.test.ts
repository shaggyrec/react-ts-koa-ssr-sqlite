import assert from 'assert';
import sqlite3 from 'sqlite3';
import Sqlite from '../../src/services/Sqlite';
import { pathToDb } from './fixture';

describe('Sqlite', (): void => {
    let sqlite: Sqlite;
    beforeEach((): void => {
        sqlite = new Sqlite(new sqlite3.Database(pathToDb));
        sqlite.db.run('BEGIN TRANSACTION');
    });

    afterEach((): void => sqlite.db.exec('ROLLBACK'));

    it('should use all()',  async (): Promise<void> => {
        const result = await sqlite.all('SELECT * FROM page LIMIT 1');
        assert.strictEqual(1, result.length);
    });

    it('should use get', async (): Promise<void> => {
        const result = await sqlite.get('SELECT title FROM page WHERE id = ?', [1]);
        // @ts-ignore
        assert.strictEqual('first article', result.title);
    });

});
