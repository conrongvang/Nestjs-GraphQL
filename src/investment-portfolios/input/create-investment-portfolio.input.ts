import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateInvestmentPortfolioInput {
  @Field(() => String)
  symbol: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => String)
  userId: string;
}
