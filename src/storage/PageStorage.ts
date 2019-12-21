import PageSchema from '../dataTypes/PageSchema';
import { omitNullAndUndefinedValues } from '../functions';
import Sqlite from '../services/Sqlite';

class PageStorage {
    public static readonly dbFieldsToWrite: string[] = ['title', 'header', 'description', 'content', 'alias', 'tags', 'active', 'excludeFromBlog'];
    private static readonly dbName: string = 'page';
    private static readonly dbFields: string[] = ['id', 'title', 'description', 'header', 'content', 'alias', 'created', 'tags', 'active', 'excludeFromBlog'];
    private db: Sqlite;

    public constructor(db: Sqlite) {
        this.db = db;
    }

    public list(limit: number = 10, offset: number = 0, onlyActive: boolean = true): Promise<PageSchema[]> {
        return this.db.all(
            `SELECT ${PageStorage.dbFields.join(',')}
                    FROM ${PageStorage.dbName}
                    WHERE excludeFromBlog != true
                    ${PageStorage.onlyActiveClause(onlyActive)}
                    ORDER BY created DESC, id DESC
                    LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    }

    public async count(onlyActive: boolean = true): Promise<number> {
        const response: { count: number } = await this.db.get(
            `SELECT count(id) as count FROM ${PageStorage.dbName}
                    WHERE id > 0
                    ${PageStorage.onlyActiveClause(onlyActive)}`
        );

        return response.count;
    }

    public byAlias(alias: string, onlyActive: boolean = true): Promise<any> {
        return this.db.get(
            'SELECT ' + PageStorage.dbFields.join(',') + ' FROM ' + PageStorage.dbName + ' WHERE alias = ?' + PageStorage.onlyActiveClause(onlyActive),
            [alias]
        );
    }

    public byId(id: number): Promise<PageSchema> {
        return this.db.get(
            'SELECT ' + PageStorage.dbFields.join(',') + ' FROM ' + PageStorage.dbName + ' WHERE id = ?',
            [id]
        );
    }

    public next(id: number): Promise<PageSchema> {

        return this.db.get(
            `SELECT ${PageStorage.dbFields.join(',')} FROM ${PageStorage.dbName}
WHERE active = true
  AND id < (SELECT id FROM page WHERE id = ?)
  AND id > 0
ORDER BY id DESC
LIMIT 1`, [id]);
    }

    public update(id: number, data: object): Promise<void> {

        const commaSeparatedFieldsWithPlaceholders = Object
            .keys(data)
            .map((field: string): string => field + ' = ?')
            .join(',');

        return this.db.run(
            `UPDATE ${PageStorage.dbName} SET ${commaSeparatedFieldsWithPlaceholders} WHERE id = ?`,
            [ ...Object.values(data), id ]);
    }

    public create(data: PageSchema): Promise<void> {
        const mappedRow = PageStorage.dbFieldsMapper(data);
        const commaSeparatedFields = Object.keys(mappedRow)
            .map((field: string): string => field)
            .join(',');
        const commaSeparatedPlaceholders = Object.keys(mappedRow)
            .map((): string => '?')
            .join(',');

        return this.db.run(
            `INSERT INTO ${PageStorage.dbName} (${commaSeparatedFields}) VALUES (${commaSeparatedPlaceholders})`,
            [ ...Object.values(mappedRow)]
        );
    }

    private static dbFieldsMapper(page: PageSchema): object {
        return omitNullAndUndefinedValues({
            title: page.title,
            header: page.header,
            content: page.content,
            description: page.description,
            active: page.active,
            alias: page.alias,
            // eslint-disable-next-line @typescript-eslint/camelcase
            user_id: page.userId
        });
    }

    private static onlyActiveClause(onlyActive: boolean): string {
        return onlyActive ? ' AND active = true ' : '';
    }
}

export default PageStorage;
