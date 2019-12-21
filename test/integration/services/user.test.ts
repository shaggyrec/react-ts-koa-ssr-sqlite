import assert from 'assert';
import Authentication from '../../../src/services/Authentication';
import Hasher from '../../../src/services/Hasher';
import Sqlite from '../../../src/services/Sqlite';
import User from '../../../src/services/User';
import UserStorage from '../../../src/storage/UserStorage';
import { end, load } from '../fixture';

describe('Me service', (): void => {

    let sqlite: Sqlite;
    beforeEach((): void => {
        sqlite = load();
    });

    afterEach((): void => end());

    function service(): User {
        const userStorage = new UserStorage(sqlite);
        return new User(userStorage, new Hasher(), new Authentication('secret', userStorage));
    }

    it('should login user', async (): Promise<void> => {
        const token = await service().login('i@shagg.ru', 'testerPassword123');
        assert.strictEqual(typeof token, 'string');
    });

    it('should throw bad request when user or password are wrong', (): void => {
        assert.rejects( async (): Promise<void> => {
            await service().login('i@shagg.ru', 'bad password');
        });
    });
});
