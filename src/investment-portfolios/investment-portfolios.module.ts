import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { InvestmentPortfoliosResolver } from "./investment-portfolios.resolver";

@Module({
  imports: [DatabaseModule],
  providers: [InvestmentPortfoliosResolver],
})
export class InvestmentPortfoliosModule {}
