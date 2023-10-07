import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { UsersController } from "./users.controller";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
