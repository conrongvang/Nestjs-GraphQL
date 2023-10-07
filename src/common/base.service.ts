import { AppLoggerService } from "./logger.service";

export class BaseService extends AppLoggerService {
  constructor(loggerName: string) {
    super(loggerName);
  }
}
