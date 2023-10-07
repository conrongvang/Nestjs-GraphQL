import { AppLoggerService } from "./logger.service";
// import { ApiBearerAuth } from "@nestjs/swagger";

// @ApiBearerAuth()
export class BaseController extends AppLoggerService {
  constructor(loggerName: string) {
    super(loggerName);
  }
}
