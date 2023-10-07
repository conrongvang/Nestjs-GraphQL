import { AppLoggerService } from "./logger.service";

export class BaseResolver extends AppLoggerService {
  constructor(loggerName: string) {
    super(loggerName);
  }
}
