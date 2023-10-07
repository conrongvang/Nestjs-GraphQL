import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "users/schemas/user.graphql";
import { MetdataDataType } from "./metadata.graphql";

@ObjectType()
export class StockPreferenceType {
  @Field(() => ID)
  id: string;

  @Field()
  symbol: string;

  @Field(() => UserType)
  user: UserType;

  @Field()
  metaData: MetdataDataType;
}
