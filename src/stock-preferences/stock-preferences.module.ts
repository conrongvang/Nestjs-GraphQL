import { Module } from "@nestjs/common";
import { DatabaseModule } from "common/database/database.module";
import { StockPreferencesResolver } from "./stock-preferences.resolver";

@Module({
  imports: [DatabaseModule],
  providers: [StockPreferencesResolver],
})
export class StockPreferencesModule {}
