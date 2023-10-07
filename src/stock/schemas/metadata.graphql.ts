import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StockPreferenceType } from "./stock-preference.graphql";
import { TimeSeriresType } from "./time-series.graphql";

@ObjectType()
export class MetdataDataType {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  information: string;

  @Field()
  symbol: string;

  @Field()
  lastRefreshed: string;

  @Field()
  interval: string;

  @Field()
  outputSize: string;

  @Field()
  timeZone: string;

  @Field(() => [TimeSeriresType])
  timeSeries: [TimeSeriresType];

  @Field(() => [StockPreferenceType])
  stockPreferences: StockPreferenceType[];
}

export interface IStockData {
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
