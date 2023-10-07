import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class QueryInvestmentPortfolioInput {
  @Field(() => String, { nullable: true })
  symbol?: string;

  @Field(() => Number, { nullable: true })
  quantity?: number;

  @Field(() => String, { nullable: true })
  userId?: string;
}
