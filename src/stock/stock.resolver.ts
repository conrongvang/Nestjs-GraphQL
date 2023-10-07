import { HttpService } from "@nestjs/axios";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { BaseResolver } from "common/base.resolver";
import GraphQLJSON from "graphql-type-json";
import { QueryStockDataInput } from "./input/query-stock.input";

interface IStockData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
  };
  [key: `Time Series (${string})`]: {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

@Resolver()
export class StockResolver extends BaseResolver {
  constructor(private readonly httpService: HttpService) {
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
