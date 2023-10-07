import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "users/schemas/user.graphql";

@ObjectType()
export class InvestmentPortfolioType {
  @Field(() => ID)
  id: string;

  @Field()
  quantity: number;

  @Field(() => UserType)
  user: UserType;
}
