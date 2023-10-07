import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigs } from "app.config";
import { join } from "path";
import { UserEntity } from "./stock/entities/user.entity";
import { UsersDbService } from "./stock/providers/user-db.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: AppConfigs.stockDb.type,
        host: AppConfigs.stockDb.host,
        port: AppConfigs.stockDb.port,
        username:
          AppConfigs.stockDb.username !== ""
            ? AppConfigs.stockDb.username
            : undefined,
        password:
          AppConfigs.stockDb.password !== ""
            ? encodeURIComponent(AppConfigs.stockDb.password as string)
            : undefined,
        database: AppConfigs.stockDb.database,
        entities: [__dirname + "/../**/stock/entities/*.entity.{ts,js}"],
        synchronize: true,
        extra: AppConfigs.stockDb.extra,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UsersDbService],
  exports: [UsersDbService],
})
export class DatabaseModule {}
