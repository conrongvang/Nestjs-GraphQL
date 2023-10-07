import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class QueryStockDataInput {
  @Field(() => String, { defaultValue: "TIME_SERIES_INTRADAY" })
  function: "TIME_SERIES_INTRADAY";

  @Field(() => String, { defaultValue: "IBM" })
  symbol: string;

  @Field(() => String, { defaultValue: "LWIZAWFQZDQKDVEV" })
  apikey: string;

  @Field(() => String, {
    defaultValue: "5min",
    description: "'1min' | '5min' | '15min' | '30min' | '60min'",
  })
  interval: "1min" | "5min" | "15min" | "30min" | "60min";

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  adjusted?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  extended_hours?: boolean;

  @Field(() => String, {
    nullable: true,
    description: "YYYY-MM",
  })
  month?: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: "compact",
    description: "'compact' | 'full'",
  })
  outputsize?: "compact" | "full";

  @Field(() => String, {
    nullable: true,
    defaultValue: "json",
    description: "'json' | 'csv'",
  })
  datatype?: "json" | "csv";
}
