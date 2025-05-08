import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSystemDataSource implements LogDatasource {
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/all.log';
    private readonly mediumLogsPath = 'logs/medium.log';
    private readonly highLogsPath = 'logs/high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJSON);

        if (newLog.level === LogServerityLevel.low) {
            return;
        }

        if (newLog.level === LogServerityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJSON);
        }

        if (newLog.level === LogServerityLevel.high) {
            fs.appendFileSync(this.highLogsPath, logAsJSON);
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(log => {
            return LogEntity.fromJSON(log)
        });

        return logs;
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        switch(severityLevel) {
            case(LogServerityLevel.low):
                return this.getLogsFromFile(this.allLogsPath);
            case(LogServerityLevel.medium):
                return this.getLogsFromFile(this.mediumLogsPath);
            case(LogServerityLevel.high):
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}