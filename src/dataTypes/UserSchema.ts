export default interface UserSchema {
    id?: number;
    email: string;
    password?: string;
    username: string;
    created?: Date;
    updated?: Date;
}
