import Unauthorized from '../errors/Unauthorized';
import UserStorage from '../storage/UserStorage';
import Authentication from './Authentication';
import Hasher from './Hasher';

class User {
    private storage: UserStorage;
    private hasher: Hasher;
    private auth: Authentication;

    public constructor(storage: UserStorage, hasher: Hasher, auth: Authentication) {
        this.storage = storage;
        this.hasher = hasher;
        this.auth = auth;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.storage.byEmail(email);

        if (await this.hasher.verifyPassword(password, user.password)) {
            return this.auth.authenticate(user);
        }

        throw new Unauthorized('Wrong credentials');
    }
}

export default User;
