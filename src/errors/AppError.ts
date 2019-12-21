interface AppErrorInterface {
    message: string;
}

export default class AppError implements AppErrorInterface {
    public message: string;
    public constructor(message: string) {
        this.message = message;
    }
}
