import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "app.controller";
import { AppService } from "app.service";
import { AppLoggerMiddleware } from "common/middlewares/logging.middleware";
import { HealthModule } from "./health/health.module";
import { StockPreferencesModule } from "./stock-preferences/stock-preferences.module";
import { StockModule } from "./stock/stock.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    HttpModule,
    HealthModule,
    UsersModule,
    StockModule,
    StockPreferencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
