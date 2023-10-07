import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { AppConfigs } from "app.config";
import { BaseController } from "common/base.controller";
import { Public } from "common/decorators/public.decorator";

@Controller("health")
export class HealthController extends BaseController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dbHc: TypeOrmHealthIndicator
  ) {
    super(HealthController.name);
  }

  @Public()
  @Get(["/hc"])
  @HealthCheck()
  @ApiOkResponse()
  @ApiOperation({ summary: "Check all services are up or down" })
  async check() {
    this.logger.log(`Checking current status of all services`);
    this.logger.log(JSON.stringify(AppConfigs.stockDb));

    return this.health.check([
      async () => await this.dbHc.pingCheck("Database"),
    ]);
  }
}
