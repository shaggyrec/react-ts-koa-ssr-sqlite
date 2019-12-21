import bcrypt from 'bcryptjs';

export interface HasherInterface {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
}

export default class Hasher implements HasherInterface {
    public async hashPassword(password: string): Promise<string> {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hash(password, salt);
    }

    public verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
