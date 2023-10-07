import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "users/schema/user.graphql";

@ObjectType()
export class InvestmentPortfolioType {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  symbol: string;

  @Field(() => Number, { nullable: true })
  quantity: number;

  @Field(() => String, { nullable: true })
  userId: string;

  @Field(() => UserType, { nullable: true })
  user: UserType;
}
