import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "users/schemas/user.graphql";
import { MetdataDataType } from "./metadata.graphql";

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

  @Field({ nullable: true })
  metaDataId: string;

  @Field(() => MetdataDataType, { nullable: true })
  metaData: MetdataDataType;
}
