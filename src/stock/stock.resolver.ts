import { HttpService } from "@nestjs/axios";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { BaseResolver } from "common/base.resolver";
import { StockDbService } from "common/database/stock/providers/stock-db.service";
import { UsersDbService } from "common/database/stock/providers/user-db.service";
import GraphQLJSON from "graphql-type-json";
import { QueryStockDataInput } from "./input/query-stock.input";
import { IStockData } from "./schemas/metadata.graphql";

@Resolver()
export class StockResolver extends BaseResolver {
  constructor(
    private readonly httpService: HttpService,
    private readonly stocDbService: StockDbService,
    private readonly usersDbService: UsersDbService
  ) {
    super(StockResolver.name);
  }

  @Query(() => GraphQLJSON)
  async stockData(@Args("query") query: QueryStockDataInput) {
    try {
      const response = await this.httpService.axiosRef.get(
        "https://www.alphavantage.co/query",
        { params: query }
      );

      if (!response?.data) {
        return {};
      }

      return response?.data as IStockData;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
}
