import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
    // TODO same as "private readonly logDataSource: LogDataSource"
    // private logDataSource: LogDatasource;
    // this.logDataSource = logDataSource
    
    constructor(
        private readonly logDataSource: LogDatasource
    ) {
        
    }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log)
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel)
    }
}