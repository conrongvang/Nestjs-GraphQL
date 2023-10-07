import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "common/database/database.module";
import { StockController } from "./stock.controller";
import { StockResolver } from "./stock.resolver";
import { StockService } from "./stock.service";

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [StockController],
  providers: [StockResolver, StockService],
})
export class StockModule {}
