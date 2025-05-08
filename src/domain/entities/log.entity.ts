export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity {
    public level: LogServerityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogServerityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJSON = (json: string): LogEntity => {
        const {message, level, createdAt} = JSON.parse(json);
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        if (!message) {
            throw new Error('Message is required');
        }

        if (!level) {
            throw new Error('Level is required');
        }

        return log;
    }
}