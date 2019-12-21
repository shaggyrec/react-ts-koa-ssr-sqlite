import sqlite from 'sqlite3';

class Sqlite {
    private static readonly METHOD_ALL: string = 'all';
    private static readonly METHOD_GET: string = 'get';
    private static readonly METHOD_RUN: string = 'run';
    public db: sqlite;

    public constructor(db: sqlite) {
        this.db = db;
    }

    public all(sql: string, params: [] | object = []): Promise<[]> {
        return this.sqlQuery(Sqlite.METHOD_ALL, sql, params);
    }

    public get<T>(sql: string, params: [] | object = []): Promise<T> {
        return this.sqlQuery(Sqlite.METHOD_GET, sql, params);
    }

    public run(sql: string, params: [] | object = []): Promise<void> {
        return this.sqlQuery(Sqlite.METHOD_RUN, sql, params);
    }

    private sqlQuery(fnName: string, sql: string, params: [] | object): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void): void => {
            this.db[fnName](sql, params, (err: Error, res: any): void => {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
    }
}

export default Sqlite;
