import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BaseController } from "common/base.controller";
import { Public } from "common/decorators/public.decorator";
import * as fs from "fs";
import { AppService } from "./app.service";

@Controller()
@ApiTags("Shared APIs")
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super(AppController.name);
  }

  @Public()
  @Get("/postman")
  @ApiOkResponse({ description: "Generated OpenAPI in JSON format successful" })
  @ApiOperation({ summary: "Return json data uses to import to Postman app" })
  async getPostmanApiCollection() {
    return JSON.parse(
      fs.readFileSync("./swagger-doc.json", { encoding: "utf-8" })
    );
  }

  @Public()
  @Get("/v1/enum")
  async getEnumApp() {
    return this.appService.getEnumApp();
  }
}
