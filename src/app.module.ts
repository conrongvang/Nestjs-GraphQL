import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppLoggerMiddleware } from "common/middlewares/logging.middleware";
import { HealthModule } from "./health/health.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [HealthModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
