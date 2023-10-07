import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigs } from "app.config";
import GraphQLJSON from "graphql-type-json";
import { join } from "path";
import { InvestmentPortfolioEntity } from "./stock/entities/investment-portfolio.entity";
import { MetaDataEntity } from "./stock/entities/metadata.entity";
import { StockPreferenceEntity } from "./stock/entities/stock-preference.entity";
import { TimeSeriesEntity } from "./stock/entities/time-series.entity";
import { UserEntity } from "./stock/entities/user.entity";
import { StockDbService } from "./stock/providers/stock-db.service";
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
      resolvers: { JSON: GraphQLJSON },
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      MetaDataEntity,
      TimeSeriesEntity,
      StockPreferenceEntity,
      InvestmentPortfolioEntity,
    ]),
  ],
  providers: [UsersDbService, StockDbService],
  exports: [UsersDbService, StockDbService],
})
export class DatabaseModule {}
