import { envs } from '../../config/plugins/envs.plugin';
import nodemailer from 'nodemailer';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments: Attachment[]
}

interface Attachment {
    filename: string,
    path: string
}

export class EmailService {
    constructor() {}

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions):Promise<boolean> {
        const {to, subject, htmlBody, attachments = []} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            // console.log(sentInformation)
            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h2>Logs del sistema - NOC</h2>
        <p>Ver logs adjuntos</p>
        `;
        const attachments: Attachment[] = [
            {
                filename: 'all.log', path: './logs/all.log'
            },
            {
                filename: 'high.log', path: './logs/high.log'
            },
            {
                filename: 'medium.log', path: './logs/medium.log'
            }
        ];

        return this.sendEmail({to, subject, htmlBody, attachments})
    }
}