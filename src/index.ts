import pathToRoot from 'app-root-path';
import Koa from 'koa';
import sqlite3 from 'sqlite3';
import Application from './Application';
import Sqlite from './services/Sqlite';
import settings from './settings';

const dbUrl = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.indexOf('dev') !== -1 ?
    pathToRoot + '/db/db-test.sqlite' :
    pathToRoot + '/db/db.sqlite';

const app = new Application(new Koa(), new Sqlite(new sqlite3.Database(dbUrl)), settings);
app.run(3080);
