import { Controller, Get } from "@nestjs/common";
import { BaseController } from "common/base.controller";
import { StockService } from "./stock.service";

@Controller({ path: "stock", version: "1" })
export class StockController extends BaseController {
  constructor(private readonly stockService: StockService) {
    super(StockController.name);
  }

  @Get()
  async getStockData() {
    return this.stockService.getStockData();
  }
}
