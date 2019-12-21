import assert from 'assert';
import Hasher from '../../../src/services/Hasher';

describe('Hasher', (): void => {
    it('Should return validate password', async (): Promise<void> => {
        const hasher = new Hasher();
        const hashedPassword = await hasher.hashPassword('password');
        const verify = await hasher.verifyPassword('password', hashedPassword);
        assert(verify);
    });

    it('Should return false when password is not valid', async (): Promise<void> => {
        const hasher = new Hasher();
        const hashedPassword = await hasher.hashPassword('password');
        const verify = await hasher.verifyPassword('password123', hashedPassword);
        assert.strictEqual(verify, false);
    });
});
