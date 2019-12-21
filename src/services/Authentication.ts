import jwt from 'jsonwebtoken';
import UserSchema from '../dataTypes/UserSchema';
import UserStorage from '../storage/UserStorage';

class Authentication {
    private readonly secret: string;
    private readonly userStorage: UserStorage;

    public constructor(secret: string, userStorage: UserStorage) {
        this.secret = secret;
        this.userStorage = userStorage;

    }

    public async tryToAuth(token: string): Promise<UserSchema> {
        try {
            const decode: any = jwt.verify(token, this.secret);
            const user = await this.userStorage.byEmail(decode.email);
            if (user) {
                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                };
            }
            return;
        } catch (err) {
            // do nothing
        }
    }

    public authenticate(user: UserSchema): string {
        return jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            this.secret,
            {
                expiresIn: 60 * 60 * 24 * 31 * 12
            }
        );
    }
}

export default Authentication;
