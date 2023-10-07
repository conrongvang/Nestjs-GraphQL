import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "users/schema/user.graphql";

@ObjectType()
export class StockPreferenceType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  symbol: string;

  @Field({ nullable: true })
  userId: string;

  @Field(() => UserType, { nullable: true })
  user: UserType;
}
