export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogServerityLevel,
    message: string,
    origin: string,
    createdAt?: Date
}

export class LogEntity {
    public level: LogServerityLevel;
    public message: string;
    public origin: string;
    public createdAt?: Date;

    constructor( options: LogEntityOptions ) {
        const {message, level, origin, createdAt = new Date()} = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJSON = (json: string): LogEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json);
        const log = new LogEntity({level, message, origin, createdAt});

        if (!message) {
            throw new Error('Message is required');
        }

        if (!level) {
            throw new Error('Level is required');
        }

        return log;
    }
}