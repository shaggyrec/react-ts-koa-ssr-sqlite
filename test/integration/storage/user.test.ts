import assert = require('assert');
import UserStorage from '../../../src/storage/UserStorage';
import { end, load } from '../fixture';

describe('Me storage', (): void => {
    let userStorage;
    beforeEach((): void => {
        const db = load();
        userStorage = new UserStorage(db);
    });
    afterEach((): void => end());

    it('should find user by email', async (): Promise<void> => {
        const user = await userStorage.byEmail('i@shagg.ru');
        assert.deepStrictEqual(user.username, 'tester');
    });

    it('should return undefined when user`s email not found' , async (): Promise<void> => {
        const user = await userStorage.byEmail('non@existing.email');
        assert.deepStrictEqual(user, undefined);
    });
});
