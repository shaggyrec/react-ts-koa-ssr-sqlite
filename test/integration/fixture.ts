import pathToRoot from 'app-root-path';
import sqlite3 from 'sqlite3';
import Sqlite from '../../src/services/Sqlite';
export const pathToDb = pathToRoot + '//db/db-test.sqlite';
const dbConnection = new Sqlite(new sqlite3.Database(pathToDb));

const load = (): Sqlite => {
    dbConnection.db.run('BEGIN TRANSACTION');
    return dbConnection;
};

const end = (): void => {
    dbConnection.db.exec('ROLLBACK');
};

export { load, end };
