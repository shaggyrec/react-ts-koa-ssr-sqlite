import UserSchema from '../dataTypes/UserSchema';
import Sqlite from '../services/Sqlite';

class UserStorage {
    private static readonly dbName: string = 'user';
    private static readonly dbFields: string[] = ['id', 'email', 'username', 'password', 'created' , 'updated']
    private db: Sqlite;

    public constructor(db: Sqlite) {
        this.db = db;
    }

    public async byEmail(email: string): Promise<UserSchema> {
        const commaSeparatedFields = UserStorage.dbFields.join(',');
        return await this.db.get<UserSchema>(
            `SELECT ${commaSeparatedFields} FROM ${UserStorage.dbName} WHERE email = ?`,
            [email]
        );
    }
}

export default UserStorage;
