import { Logger, LoggerService } from "@nestjs/common";

export class AppLoggerService implements LoggerService {
  protected readonly logger: LoggerService;

  constructor(loggerName?: string) {
    this.logger = new Logger(loggerName || AppLoggerService.name).localInstance;
  }

  async error(message: any, ...optionalParams: any[]) {
    await this.logger.error(message, optionalParams);
  }

  async log(message: any, ...optionalParams: any[]) {
    await this.logger.log(message, optionalParams);
  }

  async warn(message: any, ...optionalParams: any[]) {
    await this.logger.warn(message, optionalParams);
  }

  async debug(message: any, ...optionalParams: any[]) {
    if (this.logger && this.logger.debug) {
      await this.logger.debug(message, optionalParams);
    }
  }

  async verbose(message: any, ...optionalParams: any[]) {
    if (this.logger && this.logger.verbose) {
      await this.logger.verbose(message, optionalParams);
    }
  }
}
