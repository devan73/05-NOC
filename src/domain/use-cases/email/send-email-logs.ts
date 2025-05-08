import { EmailService } from "../../../presentation/email/email.service"
import { LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"

interface SendEmailLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCase {
    constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) {}

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            const log = {
                message: `Log email sent`,
                level: LogServerityLevel.low,
                origin: 'send-email-logs.ts'
            };

            if (!sent) {
                throw new Error('Email log was not sent');
            }

            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const log = {
                message: `${error}`,
                level: LogServerityLevel.high,
                origin: 'send-email-logs.ts'
            };

            this.logRepository.saveLog(log)
            return false;
        }
    };
}