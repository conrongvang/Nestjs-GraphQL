import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { BaseService } from "common/base.service";

@Injectable()
export class StockService extends BaseService {
  constructor(private readonly httpService: HttpService) {
    super(StockService.name);
  }

  async getStockData(
    query: {
      interval?: "1min" | "5min" | "15min" | "30min" | "60min";
      adjusted?: boolean;
      extended_hours?: boolean;
      month?: string;
      outputsize?: "compact" | "full";
      datatype?: "json" | "csv";
    } = {
      interval: "5min",
      adjusted: true,
      extended_hours: true,
      outputsize: "compact",
      datatype: "json",
    }
  ) {
    try {
      const response = await this.httpService.axiosRef.get(
        "https://www.alphavantage.co/query",
        {
          params: {
            function: "TIME_SERIES_INTRADAY",
            symbol: "IBM",
            apikey: "LWIZAWFQZDQKDVEV",
            ...query,
          },
        }
      );

      if (!response?.data) return {};

      return response?.data;
    } catch (error) {
      console.error("error: ", error);
    }
  }
}
