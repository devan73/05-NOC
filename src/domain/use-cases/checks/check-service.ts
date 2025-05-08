import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository
    ) {}

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error('Error on check service ' + url)
            }

            const log = new LogEntity(`Service ${url} working`, LogServerityLevel.low);
            this.logRepository.saveLog(log);
            this.successCallback();
            return true;
        } catch(error) {
            const errorMsg = `${error}`
            const log = new LogEntity(errorMsg, LogServerityLevel.high);
            this.logRepository.saveLog(log);
            this.errorCallback(errorMsg);
            return false;
        }
    }
}